"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@as-integrations/express4");
const index_1 = require("./graphql/typeDefs/index");
const index_2 = require("./graphql/resolvers/index");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const auth_1 = require("./middleware/auth");
const catRoutes_1 = __importDefault(require("./routes/catRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use(auth_1.authMiddleware);
app.use("/api/cats", catRoutes_1.default);
const startServer = async () => {
    const server = new server_1.ApolloServer({
        typeDefs: index_1.typeDefs,
        resolvers: index_2.resolvers,
    });
    await server.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => ({
            userId: req.userId,
            req,
            res,
        }),
    }));
    await mongoose_1.default.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
};
startServer();
exports.default = app;
