/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import WebSocket from 'ws';
import { dataSchema, DataType } from './types';
import dotenv from 'dotenv';
dotenv.config();

const ws = new WebSocket('ws://bad-api-assignment.reaktor.com/rps/live');
ws.on('message', async (data) => {
    const gameData = await dataSchema.validate(JSON.parse(data.toString()));
    gameData.t = Date.now();
    if (gameData.type === 'GAME_RESULT') {
        await addGameResultToHistory(gameData);
    }
});

const addGameResultToHistory = async (data: DataType) => {
    const historyApiURI = process.env.HISTORY_API_URI || 'http://localhost:3001/api/history';
    try {
        const res = await axios.post(historyApiURI, data);
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};

//Only implemented express, so this heroku app can be waken up.







