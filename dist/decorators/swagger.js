"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerResponse = exports.swaggerRequestBody = exports.swaggerDescription = exports.swaggerSummary = exports.swaggerTags = void 0;
const swaggerTags = (tags) => ({
    tags,
    responses: {}, // Added to satisfy OpenAPIV3.OperationObject
});
exports.swaggerTags = swaggerTags;
const swaggerSummary = (summary) => ({
    summary,
    responses: {}, // Added to satisfy OpenAPIV3.OperationObject
});
exports.swaggerSummary = swaggerSummary;
const swaggerDescription = (description) => ({
    description,
    responses: {}, // Added to satisfy OpenAPIV3.OperationObject
});
exports.swaggerDescription = swaggerDescription;
const swaggerRequestBody = (schema) => ({
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema,
            },
        },
    },
    responses: {}, // Added to satisfy OpenAPIV3.OperationObject
});
exports.swaggerRequestBody = swaggerRequestBody;
const swaggerResponse = (status, description, schema) => ({
    [status]: {
        description,
        content: {
            "application/json": {
                schema,
            },
        },
    },
});
exports.swaggerResponse = swaggerResponse;
