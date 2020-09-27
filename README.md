# Captains-Progress-Bar

### About </br>
A progress bar for GTA V FiveM which is triggered by an Action such as using the ATM.


### How to Install
- Clone or Download the progressbar folder.
- Drop the folder in your FiveM Server Resources folder.
- Add the Resource to your FiveM server.cfg file.
<br/>

### How to Use
- In your own resource lua script call: </br>
**exports["progressbar"]:createProgressBar(Label, Duration)**
</br>

**Code Example** </br>
![Code Example](https://i.imgur.com/biLKfu6.png) </br>
The Export returns a **Boolean.** </br>
**IF** the bool returns **TRUE** that means the bar successfully finished. Task complete. </br>
**IF** the bool returns **FALSE** that means the bar was stop / interrupted. Task failed. </br>
So when the Export is called store that into a varible such as in the code example -> local result. </br>
Then use the variable **result** in a conditional to trigger what happens. </br>
</br>
In the example **IF** the export returns **TRUE** it will prompt the ATM bank UI. </br>
And **IF** it returned **FALSE** it wouldn't open the ATM bank UI. </br>
</br>
Currently the ONLY way to stop / interrupt the progress bar is with **SPACEBAR**. </br>
*(More ways of interrupting the Progress bar can be added in the progressbar-c.lua)* </br>
</br>
**Screenshot Examples** </br>
![Impound](https://i.imgur.com/D9WRgtR.png) </br>
![ATM](https://i.imgur.com/yLvvHHr.png) </br>
