"use client";
export function Title({ notesObj, setState }) {
    function typeOut() {
        if (notesObj.title != document.getElementById(`boardTitle`).value) {
            notesObj.title = document.getElementById(`boardTitle`).value;
            setState({ changed: true });
        }
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
