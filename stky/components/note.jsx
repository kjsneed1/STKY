import { useState } from "react";

export function Note({
    k,
    stateObj,
    notesObj,
    color = 1,
    title,
    text,
    setState,
    notesInToOut,
}) {
    let mouseOn = false;
    const [noteColor, setColor] = useState(color);
    const [buttonDisplay, setButtonDisplay] = useState({
        visibility: "hidden",
    });

    function noteHover() {
        mouseOn = true;
        if (!stateObj.isTyping) {
            setButtonDisplay({ visibility: "visible" });
        }
    }
    function leaveNote() {
        mouseOn = false;
        if (!stateObj.isTyping) {
            setButtonDisplay({ visibility: "hidden" });
        }
    }

    function typeIn() {
        stateObj.isTyping = true;
        setButtonDisplay({ visibility: "visible" });
    }

    function typeOut() {
        stateObj.isTyping = false;

        if(notesObj.notes[k].title != document.getElementById(`${k}title`).value){
            setState({changed:true})
        }
        if(notesObj.notes[k].text != document.getElementById(`${k}text`).value){
            setState({changed:true})
        }

        notesObj.notes[k].title = document.getElementById(`${k}title`).value;
        notesObj.notes[k].text = document.getElementById(`${k}text`).value;

        if (!mouseOn) {
            setButtonDisplay({ visibility: "hidden" });
        }
    }

    function handleDelete() {
        notesObj.notesOrder = notesObj.notesOrder.filter((key) => key != k);
        setState({ changed: true });
    }

    function changeNoteColor(color = 1){
        if(color < 1 || color > 4){
            color = 1
        }
        setColor(color);
        if(notesObj.notes[k].color != color){
            setState({ changed: true });
        }
        notesObj.notes[k].color = color;
    }

    return (
        <div
            className="note"
            id={k}
            style={{
                borderColor: `var(--noteBorder${noteColor})`,
            }}
            onMouseOver={noteHover}
            onMouseOut={leaveNote}
            onClick={() => setButtonDisplay({ visibility: "visible" })}>
            <div>
                <p
                    className="grabber"
                    style={{ color: `var(--noteBorder${noteColor})` }}>
                    : : : : : : : : : : : :
                </p>
                <img
                    className="icon deleteNote"
                    src="/icons/xout.svg"
                    alt="Bruh"
                    style={buttonDisplay}
                    onClick={handleDelete}
                />
            </div>
            <input
                className="notetitle"
                id={`${k}title`}
                placeholder="Note Title"
                onFocus={typeIn}
                onBlur={typeOut}
                defaultValue={notesObj.notes[k].title}
            />
            <textarea
                className="notetext"
                id={`${k}text`}
                placeholder="Enter your text here..."
                onFocus={typeIn}
                onBlur={typeOut}
                defaultValue={notesObj.notes[k].text}
            />
            <div className="noteButtons" style={buttonDisplay}>
                <div className="noteColors">
                    <button
                        className="cb cb1"
                        onClick={() => changeNoteColor(1)}>
                        {" "}
                    </button>
                    <button
                        className="cb cb2"
                        onClick={() => changeNoteColor(2)}>
                        {" "}
                    </button>
                    <button
                        className="cb cb3"
                        onClick={() => changeNoteColor(3)}>
                        {" "}
                    </button>
                    <button
                        className="cb cb4"
                        onClick={() => changeNoteColor(4)}>
                        {" "}
                    </button>
                </div>
            </div>
        </div>
    );
}
