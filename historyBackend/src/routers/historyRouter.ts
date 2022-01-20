/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { addOneGameResultToDB, getAllHistory } from '../services/historyService';
const router = express.Router();

router.get('/', async (_req, res) => {
    const gameresults = await getAllHistory();
    res.json(gameresults);
});

router.post('/', async (req, res) => {
    const added = await addOneGameResultToDB(req.body);
    return res.status(200).json(added);
});

export default router;