import joi from "joi";

export const transactionSchema = joi.object({
    value: joi.number().positive().required(),
    type: joi.string().valid("deposit", "withdraw").required(),
    description: joi.string().required()
});