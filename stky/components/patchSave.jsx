"use client";

import { useState } from "react";

export function PatchSave({ notesObj, id, stateObj, setState }) {

    let disabled = 
        `#boardSave{
            background-color:var(--background);
            border-color:var(--buttonBackground);
            color:#404040;
            }
        #boardSave:hover{
            background-color:var(--background);
            border-color:var(--buttonBackground);
            color:#404040;
            cursor:auto;
            }
        #boardSave:active{
            background-color:var(--background);
            border-color:var(--buttonBackground);
            color:#404040;
            }
        #saveIcon{
            filter: invert(22%) sepia(0%) saturate(1%) hue-rotate(172deg) brightness(101%) contrast(89%);
        }`;

    if(stateObj.changed){
        disabled = ``}

    async function save() {
        if (stateObj.changed) {
            const sendNotes = await fetch(
                `http://localhost:3000/api/boards/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(notesObj),
                }
            );
            setState({changed:false})
        }
    }

    return (
        <div id="saveSect">
            <style>{disabled}</style>
            <div id="saveResponse">Saved!</div>
            <button id="boardSave" onClick={save}>
                <img id="saveIcon" className="icon" src="/icons/save.svg" />
                Save
            </button>
        </div>
    );
}
