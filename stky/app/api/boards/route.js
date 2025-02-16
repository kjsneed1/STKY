import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export function boardValidation(body){
    if (!body.title || body.title.length < 1) {
        return NextResponse.json(
            { error: "Please include a valid board title." },
            { status: 422 }
        );
    }
    if (!body.notesOrder || !Array.isArray(body.notesOrder)) {
        return NextResponse.json(
            { error: "Please include a valid notes order." },
            { status: 422 }
        );
    }
    if (!body.notes) {
        return NextResponse.json(
            { error: "Please include a valid notes object." },
            { status: 422 }
        );
    }

    for(let n of body.notesOrder){
        if(!body.notes[n]){
            return NextResponse.json(
                { error: "Notes order refrences notes that are not included." },
                { status: 422 }
            );
        }
    }

    for (let n in body.notes) {
        if (!body.notes[n].title) {
            return NextResponse.json(
                { error: `Please include a valid notes title for '${n}'.` },
                { status: 422 }
            );
        }
        if (!body.notes[n].text) {
            return NextResponse.json(
                { error: `Please include a valid notes text for '${n}'.` },
                { status: 422 }
            );
        }
        if (
            !body.notes[n].color ||
            isNaN(body.notes[n].color) ||
            body.notes[n].color > 4 ||
            body.notes[n].color < 1
        ) {
            return NextResponse.json(
                { error: `Please include a valid notes color between 1-4 for '${n}'.` },
                { status: 422 }
            );
        }
    }

    return undefined
}

export async function POST(request, { params }) {
    try {
        const db = await createConnection();

        const body = await request.json();

        const validation = boardValidation(body)

        if(validation){return validation}

        body.notesOrder = JSON.stringify(body.notesOrder);

        const boardsql = `insert into boards (title,notesOrder,userId)
            values ("${body.title}",'${body.notesOrder}',0);`;

        const sendBoard = await db.query(boardsql);

        const id = sendBoard[0].insertId;

        let notessql = "";

        for(let n in body.notes){
            notessql = `insert into notes (title,text,boardId,color,localId)
                values ("${body.notes[n].title}","${body.notes[n].text}",${id},${body.notes[n].color},"${n}");`;
            const sendNotes = await db.query(notessql);
        }

        return NextResponse.json({ id: id }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
