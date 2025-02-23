import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";
import { boardValidation } from "../route";

export async function GET(request, { params }) {
    try {
        const id = (await params).id;

        if (isNaN(id)) {
            return NextResponse.json({}, { status: 404 });
        }

        const db = await createConnection();
        const boardsql = `select * from boards
            where id = ${id}`;

        const board = (await db.query(boardsql))[0];

        if (!board.length) {
            return NextResponse.json({}, { status: 404 });
        }

        const boardObj = board[0];

        boardObj.notesOrder = JSON.parse(boardObj.notesOrder);

        boardObj.notes = {};

        const notessql = `select id,title,text,color,localId from notes
            where boardId = ${id}`;

        const notes = (await db.query(notessql))[0];

        for (let n of notes) {
            const localId = n.localId;
            delete n.localId;
            boardObj.notes[localId] = n;
        }

        return NextResponse.json(boardObj);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const db = await createConnection();

        const id = (await params).id;

        if (isNaN(id)) {
            return NextResponse.json({}, { status: 404 });
        }

        const checkBoard = `select * from boards
            where id = ${id}`;

        const board = (await db.query(checkBoard))[0];

        if (!board.length) {
            return NextResponse.json({}, { status: 404 });
        }

        const body = await request.json();

        const validation = boardValidation(body);

        if (validation) {
            return validation;
        }

        for (let n in body.notes) {
            if (!body.notes[n].id) {
                return NextResponse.json(
                    { error: `Note '${n}' is missing an id.` },
                    { status: 422 }
                );
            }
        }

        body.notesOrder = JSON.stringify(body.notesOrder);

        const boardsql = `UPDATE boards SET title = '${body.title}', notesOrder = '${body.notesOrder}' 
            WHERE (id = '${id}');`;
        const sendBoard = await db.query(boardsql);

        let notessql = "";
        for (let n in body.notes) {
            let note = body.notes[n];

            if (body.notesOrder.includes(n)) {
                if (note.id == "new") {
                    notessql = `insert into notes (title,text,boardId,color,localId)
                values ("${note.title}","${note.text}",${id},${note.color},"${n}");`;
                } else {
                    notessql = `UPDATE notes SET title = '${note.title}', text = '${note.text}', color = ${note.color}, localId = '${n}' 
                    WHERE (id = '${note.id}' AND boardId = ${id});`;
                }
            } else {
                if(note.id == "new"){continue}
                notessql = `DELETE FROM notes WHERE (id = ${note.id} AND boardId = ${id});`;
            }

            const sendNotes = await db.query(notessql);
        }

        return NextResponse.json({});
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const db = await createConnection();

        const id = (await params).id;

        const checkBoard = `select * from boards
            where id = ${id}`;

        const board = (await db.query(checkBoard))[0];

        if (!board.length) {
            return NextResponse.json({}, { status: 404 });
        }

        const boardsql = `DELETE FROM boards WHERE (id = ${id})`;
        const notessql = `DELETE FROM notes WHERE (boardId = ${id})`;

        const sendBoard = await db.query(boardsql);
        const sendNotes = await db.query(notessql);

        return NextResponse.json({});
    } catch {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
