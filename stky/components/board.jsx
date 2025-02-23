"use client";
import { useState } from "react";
import { Note } from "./note";
import downloadObjectAsJson from "@/util/downloadObjectAsJson";
import makeUUID from "@/util/makeUUID";

function downloadJSON() {
    const newObj = {
        notesOrder: notesObj.notesOrder,
        notesData: notesObj.notesData,
    };

    downloadObjectAsJson(newObj, "download");
}

export function Board({ notesObj }) {
    const stateObj = { isTypeing: false };

    const [empty, setEmpty] = useState({});
    const [add, setAdd] = useState({ display: "none" });
    const [notesDisplay, setNotesDisplay] = useState(
        notesObj.notesOrder.map((id) => {
            if (notesObj.notes[id]) {
                return (
                    <Note
                        k={id}
                        key={id}
                        stateObj={stateObj}
                        notesObj={notesObj}
                        color={notesObj.notes[id].color}
                        text={notesObj.notes[id].text}
                        title={notesObj.notes[id].title}
                        updateNotes={updateNotes}
                    />
                );
            }
        })
    );

    function updateNotes() {
        setNotesDisplay(
            notesObj.notesOrder.map((id) => {
                if (notesObj.notes) {
                    return (
                        <Note
                            k={id}
                            key={id}
                            stateObj={stateObj}
                            notesObj={notesObj}
                            color={notesObj.notes[id].color}
                            text={notesObj.notes[id].text}
                            title={notesObj.notes[id].title}
                            updateNotes={updateNotes}
                        />
                    );
                }
            })
        );
    }

    function AddNote() {
        let noteId = makeUUID(12, "abcdef1234567890");

        notesObj.notes[noteId] = {
            id: "new",
            title: "",
            text: "",
            color: 1,
        };
        notesObj.notesOrder.push(noteId);

        updateNotes();
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
            {notesDisplay}
            <EmptyField />
            <AddField />
        </div>
    );
}
