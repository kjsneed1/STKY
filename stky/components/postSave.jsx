"use client";

export function PostSave({ notesObj }) {
    async function save() {
        const sendNotes = await fetch(`http://localhost:3000/api/boards/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notesObj),
        });

        if ((await sendNotes.status) == 201) {
            const idObj = await sendNotes.json();
            const id = idObj.id;
            window.location.replace(`http://localhost:3000/boards/${id}`);
        }
    }

    return (
        <div id="saveSect">
            <button id="boardSave" onClick={save}>
                <img id="saveIcon" className="icon" src="/icons/save.svg" />
                Save
            </button>
        </div>
    );
}
