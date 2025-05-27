import Joi from "joi";

export const createCommentSchema = Joi.object({
  text: Joi.string().required(),
  parentComment: Joi.string().optional(),
});
