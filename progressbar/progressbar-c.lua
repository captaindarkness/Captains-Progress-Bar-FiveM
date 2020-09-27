local active = false
local interruptProgress = false
local completed = false
local space_key = 22
local e_key = 38
local result = false
local progressbar =
{
    label,
    duration
}

RegisterCommand("pb", function(source, args)
    StartProgressBar(not active)
end)

--Toggles the NUI
function StartProgressBar(bool, label, duration)
    progressbar.label = label
    progressbar.duration = duration
    active = bool
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "progressbar",
        status = bool,
        label = progressbar.label,
        duration = progressbar.duration
    })
end

function interruptProgressBar()
    interruptProgress = true
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "interrupt",
        interrupt = interruptProgress,
    })
end

RegisterNUICallback("completed", function(data)
    print("Completed - PB")
    result = true
    completed = true;
    StartProgressBar(false)
end)

RegisterNUICallback("interrupted", function(data)
    print("interrupted  - PB")
    result = false
    StartProgressBar(false)
end)

--very important cb 
RegisterNUICallback("exit", function(data)
    print("close - PB")
    StartProgressBar(false)
end)

function createProgressBar(label, duration)
    local processing = true
    active = not active
    interruptProgress = false;
    completed = false;
    StartProgressBar(active, label, duration)
    while processing do
        Wait(0)
        if IsControlJustReleased(1, space_key) then
            interruptProgressBar();
        end
        if completed == true then
            processing = false
            result = true
        elseif interruptProgress == true then
            processing = false
            result = false
        end
        --print("Processing .....")
    end
    print("Done")
    return result
end

-- Citizen.CreateThread(function()
--     while true do
--         --active it toggle, debugging
--         -- if IsControlJustReleased(1, e_key) then
--         --     --createProgressBar("Test", 5);
--         -- end
--         --To cancel / Interrupt the progress bar
--         if IsControlJustReleased(1, space_key) then
--             interruptProgressBar();
--         end
--         Citizen.Wait(0)
--     end
-- end)