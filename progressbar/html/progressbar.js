$(function () {

    var theBar = document.getElementById("bar");
    var theContainer = document.getElementById("progressBar");
    var theLabel = document.getElementById("label");
    var interrupting = false;
    var label = "Loading .. ";
    var duration = 10; //Seconds
    var hidePercentageInsideBar = true // Hide the % inside theBar

    function display(bool) {
        if (bool) {
            theContainer.style.opacity = 75 + "%";
            theLabel.innerHTML = label;
            move();
        } else {
            theContainer.style.opacity = 0 + "%";
        }
    }
    display(false);
    window.addEventListener('message', function(event) {
        var item = event.data;
        //Initial called to show NUI
        if (item.type === "progressbar") 
        {
            if (item.status == true) 
            {
                label = item.label;
                duration = item.duration;
                display(true)
            } 
            else 
            {
                display(false)
            }
        }
        if(item.type = "interrupt")
        {
            if(item.interrupt == true)
            {
                interruptProgress();
            }
        }
    })
    //Doesnt work because NUI isnt in focus (setnuifocus(false,false) in lua)
    document.onkeyup = function (data) {
        if (data.which == 27) 
        {
            $.post('https://progressbar/interrupted', JSON.stringify({}));
            return
        }
        if (data.which == 32 || data.which == 69) 
        {
            move();
        }
    };
    //-----------------------------------------------------------------------
    var i = 0;
    function move() 
    {
        if (i == 0) 
        {
            i = 1;
            var width = 0;
            var id = setInterval(frame, duration * 10);
            function frame() 
            {
                if (width >= 100) 
                {
                    clearInterval(id);
                    i = 0;
                    completedbar();
                }
                else 
                {
                    if(interrupting)
                    {
                        interrupting = false;
                        clearInterval(id);
                        i = 0;
                        resetBar();
                    }
                    else
                    {
                        width++;
                        theBar.style.width = width + "%";
                        if (!hidePercentageInsideBar) {
                            theBar.innerHTML = width + "%";
                        }
                    }
                }
            }
        }
    }

    function interruptProgress()
    {
        interrupting = true;
        $.post('https://progressbar/interrupted', JSON.stringify({}));
    }

    function completedbar()
    {
        $.post('https://progressbar/completed', JSON.stringify({}));
        resetBar();
    }
    function resetBar()
    {
        theBar.style.width = 0 + "%";
         if (!hidePercentageInsideBar) {
            theBar.innerHTML = 0 + '%';
        }
        theBar.style.backgroundColor = "#1b1a1a";
        $.post('https://progressbar/exit', JSON.stringify({}));
    }
})