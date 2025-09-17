"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const board_routes_1 = __importDefault(require("./routes/board.routes"));
const errorHandling_middleware_1 = require("./middlewares/errorHandling.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use('/v1', auth_routes_1.default);
app.use('/v1/board', auth_middleware_1.authMiddleware, board_routes_1.default);
app.use(errorHandling_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
