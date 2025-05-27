"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, res, next) => {
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
exports.validateBody = validateBody;
