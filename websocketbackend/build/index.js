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
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
const axios_1 = __importDefault(require("axios"));
const ws_1 = __importDefault(require("ws"));
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
const addGameResultToHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const historyApiURI = process.env.HISTORY_API_URI || 'http://localhost:3001/api/history';
    try {
        const res = yield axios_1.default.post(historyApiURI, data);
        console.log(res.data);
    }
    catch (error) {
        console.log(error);
    }
});
//Only implemented express, so this heroku app can be waken up.
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'i am awake' });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(3002, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    const ws = new ws_1.default('ws://bad-api-assignment.reaktor.com/rps/live');
    ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const gameData = yield types_1.dataSchema.validate(JSON.parse(data.toString()));
        gameData.t = Date.now();
        if (gameData.type === 'GAME_RESULT') {
            yield addGameResultToHistory(gameData);
        }
    }));
});
void start();
