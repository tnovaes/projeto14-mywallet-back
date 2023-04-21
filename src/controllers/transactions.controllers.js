import { db } from "../database/database.connection.js";

export async function transaction(req, res) {
    const { value, type, description } = req.body;

    try {
        const session = res.locals.session;

        const newTransaction = {
            userId: session.userId,
            value: value*100,
            type,
            description
        };

        await db.collection("transactions").insertOne({ newTransaction });
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

