/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { getAllPlayers, getGamesByPlayer } from '../services/playerService';
const router = express.Router();

router.get('/', async (_req, res) => {
    const playerNames = await getAllPlayers();
    return res.json(playerNames);
});

router.get('/:name', async (req, res) => {
    const playerNames = await getGamesByPlayer(req.params.name);
    console.log(req.params.name);
    return res.json(playerNames);
});


export default router;