/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { getAllCursors } from '../services/cursorService';
const router = express.Router();

router.get('/', async (_req, res) => {
    const cursors = await getAllCursors();
    res.json(cursors);
});


export default router;