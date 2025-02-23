import { Board } from "@/components/board";
import { Title } from "@/components/title";
import { PostSave } from "@/components/postSave";
export default function boardPage() {
    const notesObj = {
        title: "",
        notesOrder: [],
        notes: {},
    };
    return (
        <>
            <div id="boardTop">
                <Title notesObj={notesObj} />
                <PostSave notesObj={notesObj} />
            </div>
            <div id="board">
                <Board notesObj={notesObj} />
            </div>
        </>
    );
}
