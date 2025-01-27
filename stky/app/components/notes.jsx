"use client"
import {useState} from 'react'

let totalNotes = 0

export function Notes()
{
    const [notesArray,setNotesArray] = useState([])
    const [empty,setEmpty] = useState({})
    const [add,setAdd] = useState({display:"none"})

    function Note(key)
    {
        return (
        <div className="note" key={key}>
            <p className = "grabber">: : : : : : : : : : : :</p>
            <input className = "notetitle" placeholder="Note Title"/>
            <textarea className = "notetext" placeholder="Enter your text here..."></textarea>
        </div>
        )
    }

    function AddNote()
    {
        setNotesArray([...notesArray,Note(`note${totalNotes}`)])
        totalNotes++
    }

    function EmptyField() 
    {
        const handleClick = () => 
            {
                setEmpty({display:"none"})
                setAdd({display:"inline-block"})
                AddNote()
            }

        return(
            <div id="emptyfield" onClick={handleClick} style={empty}>
                <img className="icon plusicon" src="/icons/plus.svg"/>
                <h2>Click "+" to add a new note.</h2>
            </div>
    )
    }

    function AddField() 
    {
        const handleClick = () => 
            {
                AddNote()
            }

        return(
            <div id="emptyfield" onClick={handleClick} style={add}>
                <img className="icon plusicon" src="/icons/plus.svg"/>
                <h2>Click "+" to add a new note.</h2>
            </div>
    )
    }

    return (
    <div>
        {notesArray}
        <EmptyField/>
        <AddField/>
    </div>
)
}