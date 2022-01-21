import { QueryTypes, Transaction } from "sequelize";
import { Cursor } from "../models/";
import { CursorCreationAttributes } from "../types";
import { sequelize } from "../util/database";

export const getAllCursors = async () => {
    const cursors = await Cursor.findAll();
    return cursors;
};

interface CountType {
    count: number
}

/**
 * Returns true if all the historical game result has been parsed.
 * @returns 
 */
export const isHistoryParsed = async () => {
    try {
        const lastCounter = await sequelize.query(`
        SELECT COUNT(*)
        FROM cursors C
        WHERE C.last = true;
        `, { type: QueryTypes.SELECT });
        return (lastCounter as CountType[])[0].count >= 1 || false;
     } catch(error) {
         console.log(error);
     }
     return false;
};

/**
 * Gets the latest cursor that has been parsed, so the parsing can continue from the latest cursor.
 * @returns 
 */
export const getLatestCursor = async () => {
    try {
       const latestCursor =  await sequelize.query(`
       SELECT C.next_cursor
       FROM cursors C
       WHERE c.next_cursor NOT IN (SELECT cursor FROM cursors);
       `, { type: QueryTypes.SELECT, model: Cursor, mapToModel: true });
       return latestCursor[0]?.nextCursor || "/rps/history";
    } catch(error) {
        console.log(error);
    }
    return "/rps/history";
};

/**
 * Adds single cursor to the database.
 * @param cursorObj 
 * @param t 
 */
export const addCursorToDB = async (cursorObj: CursorCreationAttributes, t: Transaction) => {
    await Cursor.upsert(cursorObj, {transaction: t});
};