"use client";
export function Title({ notesObj,setState,stateObj }) {
    function typeOut() {
        if(document.getElementById(`boardTitle`).value){
            if (notesObj.title != document.getElementById(`boardTitle`).value) {
                notesObj.title = document.getElementById(`boardTitle`).value;
                setState({changed: true,titleFilled:true});
            }
            else{
                setState({titleFilled:true})
            }
            
        }
        else{
            setState({titleFilled:false})
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
