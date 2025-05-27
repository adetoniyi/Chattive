import { Request, Response, NextFunction } from "express";

import Joi from "joi";

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
};
