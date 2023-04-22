import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function transaction(req, res) {
    const { value, type, description } = req.body;

    try {
        const session = res.locals.session;

        const newTransaction = {
            userId: session.userId,
            value: value * 100,
            type,
            description,
            date: dayjs().format("DD/MM")
        };

        await db.collection("transactions").insertOne(newTransaction);
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function balance(req, res) {
    try {
        const session = res.locals.session;

        const userTransactions = await db.collection("transactions").find({ userId: session.userId }).sort({ _id: -1 }).toArray();
        res.status(200).send(userTransactions);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

