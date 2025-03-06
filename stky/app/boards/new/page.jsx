//Board create page!

import { Board } from "@/components/board";
import { Title } from "@/components/title";
import { PostSave } from "@/components/postSave";
export default function boardPage() {
    const notesObj = {
        title: "",
        notesOrder: [],
        notes: {},
    };
    const stateObj = { isTyping: false, changed: false };
    return (
        <>
            <div>
                <Board notesObj={notesObj} stateObj={stateObj} edit = {false}/>
            </div>
        </>
    );
}
