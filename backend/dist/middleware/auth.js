"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const errors_1 = require("../errors");
const authMiddleware = (req, _res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        throw new errors_1.HttpError(401, 'No token provided');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        throw new errors_1.HttpError(401, 'Invalid token');
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map