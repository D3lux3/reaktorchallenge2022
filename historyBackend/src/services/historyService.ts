import axios from 'axios';
import { Transaction } from 'sequelize/dist';
import { GameResult } from '../models';
import { CursorCreationAttributes, dataSchema, ResponseDataType, responseSchema } from '../types';
import { sequelize } from '../util/database';
import { dataToDatabaseFormat, getRowLimit } from '../util/utils';
import { addCursorToDB, getLatestCursor, isHistoryParsed } from './cursorService';

/**
 * Parses through the game history and saves it to a database.
 * @param url Bad-api url.
 * @param currentCursor Next cursor to be concatenated with url
 * @param parsedCursors All the cursors that has been parsed before.
 * @returns 
 */
export const parseHistoricalGameResults = async (url: string, currentCursor: string, parsedCursors: string[]) => {
    const res = await axios.get(url + currentCursor);
    const data = await responseSchema.validate(res.data);
    const cursorToBeSavedtoDB: CursorCreationAttributes = {
        cursor: currentCursor,
        nextCursor: data.cursor,
        last: (data.cursor ? false : true)
    };

    if (data.cursor && (!(await isHistoryParsed()) || !parsedCursors.includes(data.cursor))) {
        console.log(data.cursor);
        await handleTransactionToDB(data.data, cursorToBeSavedtoDB);
        await deleteGameResults();
        const nextCursor = await getLatestCursor();
        await parseHistoricalGameResults(url, nextCursor, [...parsedCursors, currentCursor]);
    } else {
        await handleTransactionToDB(data.data, cursorToBeSavedtoDB);
        console.log('Done');
        return;
    }
};

export const addOneGameResultToDB = async (data: unknown) => {
    try {
        const validated = await dataSchema.validate(data);
        const formattedData = dataToDatabaseFormat(validated);
        await GameResult.upsert(formattedData);
        return formattedData;
    } catch (error) {
        console.log(error);
    }
    return null;
};

/**
 * This function deletes history data, when reaches heroku limit (10000) on database row amount.
 */
const deleteGameResults = async () => {
    const rowsLeft = await getRowLimit();
    const historyDataCount = await amountOfHistoricalGameResults();

    if (rowsLeft <= historyDataCount) {
        console.log(`*****DELETED ALL*******  history data: ${historyDataCount} rows left: ${rowsLeft}`);
        await GameResult.destroy({ truncate: true });
    }
};

const amountOfHistoricalGameResults = async () => {
    return await GameResult.count();
};

const handleTransactionToDB = async (data: ResponseDataType[], c: CursorCreationAttributes) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        await addGameResultsToDB(data, transaction);
        await addCursorToDB(c, transaction);
        await transaction.commit();
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error);
    }
};

const addGameResultsToDB = async (data: ResponseDataType[], t: Transaction) => {
    const newData = data.map((game) => (
        dataToDatabaseFormat(game)
    ));
    await GameResult.bulkCreate(newData, { transaction: t, ignoreDuplicates: true });
};


export const getAllHistory = async () => {
    const history = await GameResult.findAll();
    return history;
};

