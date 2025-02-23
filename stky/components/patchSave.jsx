"use client"

export function PatchSave({notesObj,id}){

    async function save(){
        const sendNotes = await fetch(`http://localhost:3000/api/boards/${id}`, {
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(notesObj)
        });
    }

    return <button  id="boardSave" onClick={save}><img id="saveIcon" className="icon" src="/icons/save.svg"/>Save</button>
}