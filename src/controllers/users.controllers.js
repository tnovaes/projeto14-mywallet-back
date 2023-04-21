import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {

    const { name, email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado");

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({ name, email, password: hash });
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signIn(req, res) {

    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) return res.status(404).send("E-mail não cadastrado");

        const userPassword = bcrypt.compareSync(password, user.password);
        if (!userPassword) return res.status(401).send("Senha incorreta");

        const token = uuid();

        await db.collection("sessions").insertOne({ userId: user._id, token })
        res.status(200).send(token);

    } catch (err) {
        res.status(500).send(err.message);
    }

};