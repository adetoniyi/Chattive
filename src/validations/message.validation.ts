import Joi from "joi";

export const sendMessageSchema = Joi.object({
  receiverId: Joi.string().required(),
  content: Joi.string().required(),
});
