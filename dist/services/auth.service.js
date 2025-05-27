"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const generateToken_1 = require("../utils/generateToken");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.create(data);
    const token = (0, generateToken_1.generateToken)(JSON.stringify({ id: user._id, role: user.role }));
    return { user, token };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = yield user.comparePassword(password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = (0, generateToken_1.generateToken)(JSON.stringify({ id: user._id, role: user.role }));
    return { user, token };
});
exports.loginUser = loginUser;
