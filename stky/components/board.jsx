"use client";
import { useState } from "react";
import { Note } from "./note";
import downloadObjectAsJson from "@/util/downloadObjectAsJson";
import makeUUID from "@/util/makeUUID";
import { Title } from "./title";
import { PostSave } from "./postSave";
import { PatchSave } from "./patchSave";
import { Floater } from "./floater";

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
        titleFilled: true
    });
    function setState(obj = {}) {
        stateSetter({
            ...stateObj,
            ...obj,
        });
    }

    const [grabbing, setGrabbing] = useState(false)

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
                                updateNotes={updateNotes}
                                setGrabbing={setGrabbing}
                                grabbing={grabbing}
                            />
                        );
                    }
                })}
            </>
        );
    }

    const id = notesObj.id;

    let Save;

    if (edit) {
        Save = ({stateObj}) => {
            return (
                <PatchSave
                    notesObj={localNotes}
                    id={id}
                    stateObj={stateObj}
                    setState={setState}
                />
            );
        }
    } else {
        Save = ({stateObj}) => {
            return (
                <PostSave
                    notesObj={localNotes}
                    stateObj={stateObj}
                    setState={setState}
                />
            );
        }
    }

    function updateNotes(notesObj) {
        setLocalNotes({ ...notesObj });
    }

    function AddNote(notesObj) {
        let noteId = makeUUID(12, "abcdef1234567890");

        notesObj.notes[noteId] = {
            id: "new",
            title: "",
            text: "",
            color: 1,
        };
        notesObj.notesOrder.push(noteId);

        updateNotes(notesObj);

        setState({ changed: true });
    }

    function EmptyField({notesObj}) {
        const handleClick = () => {
            setEmpty({ display: "none" });
            setAdd({ display: "inline-block" });
            AddNote(notesObj);
        };

        return (
            <div id="emptyfield" onClick={handleClick} style={empty}>
                <img className="icon plusicon" src="/icons/plus.svg" />
                <h2>Click "+" to add a new note.</h2>
            </div>
        );
    }

    function AddField({notesObj}) {
        const handleClick = () => {
            AddNote(notesObj);
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

    function GrabberActive({grabbing}){
        if(grabbing){
            const grabbingStyle =`#board{cursor:grabbing;} .note .grabber{cursor:grabbing;}` 
            return(
            <style>
                {grabbingStyle}
            </style>
        )}
    }

    return (
        <>
            <div id="boardTop">
                <Title
                    notesObj={localNotes}
                    stateObj={stateObj}
                    setState={setState}
                />
                <Save stateObj={stateObj}/>
            </div>
            <div id="board" onMouseUp={() => setGrabbing(false)}>
                <GrabberActive grabbing={grabbing}/>
                <NotesDisplay notesObj={localNotes} />
                <EmptyField notesObj={localNotes}/>
                <AddField notesObj={localNotes}/>
            </div>
        </>
    );
}
