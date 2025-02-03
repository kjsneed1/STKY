"use client";
import { useEffect, useState, useReducer } from "react";

let totalNotes = 0;
let isTypeing = false;
const notesObj = {
    notesOrder: [],
    notesData: {},
    notesJsx: [],
};
function downloadJSON() {
    function downloadObjectAsJson(exportObj, exportName) {
        var dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const newObj = 
    {
        notesOrder:notesObj.notesOrder,
        notesData:notesObj.notesData
    }

    downloadObjectAsJson(newObj, "download");
}

export function Notes() {
    const [notesArray, setNotesArray] = useState([]);
    const [empty, setEmpty] = useState({});
    const [add, setAdd] = useState({ display: "none" });

    function Note({ k, color = 1 }) {
        let mouseOn = false;
        const [noteColor, setColor] = useState(color);
        const [buttonDisplay, setButtonDisplay] = useState({
            visibility: "hidden",
        });

        function noteHover() {
            mouseOn = true;
            if (!isTypeing) {
                setButtonDisplay({ visibility: "visible" });
            }
        }
        function leaveNote() {
            mouseOn = false;
            if (!isTypeing) {
                setButtonDisplay({ visibility: "hidden" });
            }
        }

        function typeIn() {
            isTypeing = true;
            setButtonDisplay({ visibility: "visible" });
        }

        function typeOut() {
            isTypeing = false;
            if (!mouseOn) {
                setButtonDisplay({ visibility: "hidden" });
                notesObj.notesData[k].title = document.getElementById(`${k}title`).value
                notesObj.notesData[k].text = document.getElementById(`${k}text`).value
            }
        }

        function handleDelete() {
            delete notesObj.notesData[k]
            notesObj.notesOrder = notesObj.notesOrder.filter((key) => key !=k)
            notesObj.notesJsx = notesObj.notesJsx.filter((comp) => comp.key != k)
            setNotesArray(notesObj.notesJsx)
        }

        return (
            <div
                className="note"
                key={k}
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
                />
                <textarea
                    className="notetext"
                    id={`${k}text`}
                    placeholder="Enter your text here..."
                    onFocus={typeIn}
                    onBlur={typeOut}></textarea>
                <div className="noteButtons" style={buttonDisplay}>
                    <div className="noteColors">
                        <button
                            className="cb cb1"
                            onClick={() => {
                                setColor(1);
                                notesObj.notesData[k].color = 1;
                            }}>
                            {" "}
                        </button>
                        <button
                            className="cb cb2"
                            onClick={() => {
                                setColor(2);
                                notesObj.notesData[k].color = 2;
                            }}>
                            {" "}
                        </button>
                        <button
                            className="cb cb3"
                            onClick={() => {
                                setColor(3);
                                notesObj.notesData[k].color = 3;
                            }}>
                            {" "}
                        </button>
                        <button
                            className="cb cb4"
                            onClick={() => {
                                setColor(4);
                                notesObj.notesData[k].color = 4;
                            }}>
                            {" "}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function AddNote() {
        notesObj.notesJsx = [
            ...notesArray,
            <Note key={`note${totalNotes}`} k={`note${totalNotes}`} />,
        ];
        notesObj.notesData[`note${totalNotes}`] = {
            title: "",
            text: "",
            color: 1,
        };
        notesObj.notesOrder.push(`note${totalNotes}`);
        setNotesArray(notesObj.notesJsx);
        totalNotes++;
    }

    function EmptyField() {
        const handleClick = () => {
            setEmpty({ display: "none" });
            setAdd({ display: "inline-block" });
            AddNote();
        };

        return (
            <div id="emptyfield" onClick={handleClick} style={empty}>
                <img className="icon plusicon" src="/icons/plus.svg" />
                <h2>Click "+" to add a new note.</h2>
            </div>
        );
    }

    function AddField() {
        const handleClick = () => {
            AddNote();
        };

        return (
            <div id="plusfield" onClick={handleClick} style={add}>
                <img
                    id="plusnormal"
                    className="icon plusicon"
                    src="/icons/plus.svg"
                />
            </div>
        );
    }

    return (
        <div>
            {notesArray}
            <EmptyField />
            <AddField />
            <button onClick={downloadJSON}>Download</button>
        </div>
    );
}
