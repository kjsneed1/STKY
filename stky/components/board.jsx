"use client";
import { useState } from "react";
import { Note } from "./note";
import downloadObjectAsJson from "@/util/downloadObjectAsJson";
import makeUUID from "@/util/makeUUID";
import { Title } from "./title";
import { PostSave } from "./postSave";
import { PatchSave } from "./patchSave";

function downloadJSON() {
    const newObj = {
        notesOrder: notesObj.notesOrder,
        notesData: notesObj.notesData,
    };

    downloadObjectAsJson(newObj, "download");
}

export function Board({ notesObj, edit }) {
    const [stateObj, stateSetter] = useState({
        isTyping: false,
        changed: false,
    });
    function setState(obj = {}) {
        stateSetter({
            ...stateObj,
            ...obj,
        });
    }

    const [empty, setEmpty] = useState({});
    const [add, setAdd] = useState({ display: "none" });
    const [localNotes, setLocalNotes] = useState({ ...notesObj });

    function NotesDisplay({ notesObj }) {
        return (
            <>
                {notesObj.notesOrder.map((id) => {
                    if (notesObj.notes[id]) {
                        return (
                            <Note
                                k={id}
                                key={id}
                                stateObj={stateObj}
                                setState={setState}
                                notesObj={notesObj}
                                color={notesObj.notes[id].color}
                                text={notesObj.notes[id].text}
                                title={notesObj.notes[id].title}
                            />
                        );
                    }
                })}
            </>
        );
    }

    let save;
    const id = notesObj.id;

    if (edit) {
        save = (
            <PatchSave
                notesObj={localNotes}
                id={id}
                stateObj={stateObj}
                setState={setState}
            />
        );
    } else {
        save = (
            <PostSave
                notesObj={localNotes}
                stateObj={stateObj}
                setState={setState}
            />
        );
    }

    function updateNotes() {
        setLocalNotes({ ...notesObj });
        console.log(notesObj);
    }

    function AddNote() {
        let noteId = makeUUID(12, "abcdef1234567890");
        console.log(noteId);

        notesObj.notes[noteId] = {
            id: "new",
            title: "",
            text: "",
            color: 1,
        };
        notesObj.notesOrder.push(noteId);

        updateNotes();

        setState({ changed: true });
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
        <>
            <div id="boardTop">
                <Title
                    notesObj={notesObj}
                    stateObj={stateObj}
                    setState={setState}
                />
                {save}
            </div>
            <div id="board">
                <NotesDisplay notesObj={localNotes} />
                <EmptyField />
                <AddField />
            </div>
        </>
    );
}
