import { Board } from "@/components/board";
import { Title } from "@/components/title";
export default function boardPage() {
    const notesObj = {
        title: "",
        notesOrder: [],
        notes: {},
    };
    return (
        <>
            <Title notesObj={notesObj}/>
            <div id="board">
                <Board notesObj={notesObj} />
            </div>
        </>
    );
}
