"use client"
import {useState} from 'react'

let totalNotes = 0;
let isTypeing = false

export function Note(key)
{
    let mouseOn = false
    const [noteColor,setColor] = useState(1)
    const [buttonDisplay,setButtonDisplay] = useState({visibility:"hidden"})
    const [noteVisibility,setNoteVisibility] = useState("inline-block")

    function noteHover()
    {
        mouseOn = true
        if(!isTypeing)
        {
            setButtonDisplay({visibility:"visible"})
        }
    }
    function leaveNote()
    {
        mouseOn = false
        if(!isTypeing)
        {
            setButtonDisplay({visibility:"hidden"})
        }
    }

    function typeIn()
    {
        isTypeing=true
        setButtonDisplay({visibility:"visible"})
    }

    function typeOut()
    {
        isTypeing=false
        if(!mouseOn)
        {
            setButtonDisplay({visibility:"hidden"})
        }
    }

    return (
    <div className="note" key={key} id={key} style={{borderColor:`var(--noteBorder${noteColor})`,display:noteVisibility}} onMouseOver={noteHover} onMouseOut={leaveNote} onClick={()=>setButtonDisplay({visibility:"visible"})}>
        <div>
            <p className = "grabber" style={{color:`var(--noteBorder${noteColor})`}}>: : : : : : : : : : : :</p>
            <img className = "icon deleteNote" src="/icons/xout.svg" alt="Bruh" style={buttonDisplay} onClick={()=>setNoteVisibility("none")}/>
        </div>
        <input className = "notetitle" placeholder="Note Title" onFocus={typeIn} onBlur={typeOut}/>
        <textarea className = "notetext" placeholder="Enter your text here..." onFocus={typeIn} onBlur={typeOut}></textarea>
        <div className = "noteButtons" style={buttonDisplay}>
            <div className = "noteColors">
                <button className='cb cb1' onClick={()=>{setColor(1)}}> </button>
                <button className='cb cb2' onClick={()=>{setColor(2)}}> </button>
                <button className='cb cb3' onClick={()=>{setColor(3)}}> </button>
                <button className='cb cb4' onClick={()=>{setColor(4)}}> </button>
            </div>
        </div>
    </div>
    )
}

export function Notes()
{
    const [notesArray,setNotesArray] = useState([])
    const [empty,setEmpty] = useState({})
    const [add,setAdd] = useState({display:"none"})

    function AddNote()
    {
        setNotesArray([...notesArray,<Note key={`note${totalNotes}`}/>])
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