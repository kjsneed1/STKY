import { useState } from "react";

export function Note({
    k,
    stateObj,
    notesObj,
    color = 1,
    title,
    text,
    updateNotes,
}) {
    let mouseOn = false;
    const [noteColor, setColor] = useState(color);
    const [buttonDisplay, setButtonDisplay] = useState({
        visibility: "hidden",
    });

    function noteHover() {
        mouseOn = true;
        if (!stateObj.isTypeing) {
            setButtonDisplay({ visibility: "visible" });
        }
    }
    function leaveNote() {
        mouseOn = false;
        if (!stateObj.isTypeing) {
            setButtonDisplay({ visibility: "hidden" });
        }
    }

    function typeIn() {
        stateObj.isTypeing = true;
        setButtonDisplay({ visibility: "visible" });
    }

    function typeOut() {
        stateObj.isTypeing = false;

        notesObj.notes[k].title = document.getElementById(`${k}title`).value;
        notesObj.notes[k].text = document.getElementById(`${k}text`).value;

        if (!mouseOn) {
            setButtonDisplay({ visibility: "hidden" });
        }
    }

    function handleDelete() {
        notesObj.notesOrder = notesObj.notesOrder.filter((key) => key != k);
        updateNotes();
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
                        onClick={() => {
                            setColor(1);
                            notesObj.notes[k].color = 1;
                        }}>
                        {" "}
                    </button>
                    <button
                        className="cb cb2"
                        onClick={() => {
                            setColor(2);
                            notesObj.notes[k].color = 2;
                        }}>
                        {" "}
                    </button>
                    <button
                        className="cb cb3"
                        onClick={() => {
                            setColor(3);
                            notesObj.notes[k].color = 3;
                        }}>
                        {" "}
                    </button>
                    <button
                        className="cb cb4"
                        onClick={() => {
                            setColor(4);
                            notesObj.notes[k].color = 4;
                        }}>
                        {" "}
                    </button>
                </div>
            </div>
        </div>
    );
}
