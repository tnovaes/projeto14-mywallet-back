import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const tokenWithBearer = authorization?.split(" ");

    if (!tokenWithBearer || tokenWithBearer[0] !== "Bearer") return res.sendStatus(401);

    const token = tokenWithBearer[1];

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.sendStatus(401);

        res.locals.session = session;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}