let noteTotal = 0

const addNote = function()
{
    document.getElementById("board").innerHTML = 
    `<div id = "note${noteTotal}" class = "note">
        <p class = "grabber">: : : : : : : : : : : :</p>
        <input class = "notetitle" placeholder="Note Title">
        <textarea class = "notetext" placeholder="Enter your text here..."></textarea>
    </div>`
    +document.getElementById("board").innerHTML

    noteTotal++
}