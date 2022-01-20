import express from 'express';
import historyRouter from './routers/historyRouter';
import cors from 'cors';
import playerRouter from './routers/playerRouter';
import { parseHistoricalGameResults } from './services/historyService';
import { PORT } from './util/config';
import { connectToDb } from './util/database';
import { getAllCursors, getLatestCursor } from './services/cursorService';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('frontBuild'));

app.use('/api/history', historyRouter);
app.use('/api/players', playerRouter);


const start = async () => {
    await connectToDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    const nextCursor = await getLatestCursor();
    console.log("Start cursor:" + nextCursor);
    const parsedCursors = (await getAllCursors()).map(c => c.cursor);
    await parseHistoricalGameResults("https://bad-api-assignment.reaktor.com", nextCursor, parsedCursors);
};

void start();
