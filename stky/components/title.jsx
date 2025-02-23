"use client";
export function Title({ notesObj }) {
    function typeOut() {
        notesObj.title = document.getElementById(`boardTitle`).value;
    }

    return (
        <input
            className="title"
            id="boardTitle"
            placeholder="Board Title"
            onBlur={typeOut}
            defaultValue={notesObj.title}
        />
    );
}
