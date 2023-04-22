import joi from "joi";

export const transactionSchema = joi.object({
    value: joi.number().positive().precision(2).strict().required(),
    type: joi.string().valid("deposit", "withdraw").required(),
    description: joi.string().required()
});