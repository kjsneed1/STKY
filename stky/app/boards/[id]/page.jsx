import { Board } from "@/components/board";
import { PatchSave } from "@/components/patchSave";
import { Title } from "@/components/title";
export default async function boardPage({ params }) {
    const id = (await params).id;

    const getNotesObj = await fetch(`http://localhost:3000/api/boards/${id}`, {
        method: "GET",
    });

    let notesObj = {
        title: "",
        notesOrder: [],
        notes: {},
    };

    if (getNotesObj.status == 200) {
        notesObj = await getNotesObj.json();
    } else {
        return (
            <script>window.location.replace(`http://localhost:3000`)</script>
        );
    }

    return (
        <>
            <div id="boardTop">
                <Title notesObj={notesObj} />
                <PatchSave notesObj={notesObj} />
            </div>
            <div id="board">
                <Board notesObj={notesObj} />
            </div>
        </>
    );
}
