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
        function changeColor(colorNumber)
        {
            document.getElementById(key).style.borderColor = window.getComputedStyle(document.documentElement).getPropertyValue(`--noteBorder${colorNumber}`)
            document.getElementById(key).querySelector('.grabber').style.color = window.getComputedStyle(document.documentElement).getPropertyValue(`--noteBorder${colorNumber}`)
        }
        return (
        <div className="note" key={key} id={key}>
            <p className = "grabber">: : : : : : : : : : : :</p>
            <input className = "notetitle" placeholder="Note Title"/>
            <textarea className = "notetext" placeholder="Enter your text here..."></textarea>
            <div className = "noteColors">
                <button className='cb cb1' onClick={()=>changeColor(1)}> </button>
                <button className='cb cb2' onClick={()=>changeColor(2)}> </button>
                <button className='cb cb3' onClick={()=>changeColor(3)}> </button>
                <button className='cb cb4' onClick={()=>changeColor(4)}> </button>
            </div>
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
            <div id="plusfield" onClick={handleClick} style={add}>
                <img id="plusnormal" className="icon plusicon" src="/icons/plus.svg"/>
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