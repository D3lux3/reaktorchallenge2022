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

export const isHistoryParsed = async () => {
    try {
        const lastCount = await sequelize.query(`
        SELECT COUNT(*)
        FROM cursors C
        WHERE C.last = true;
        `, { type: QueryTypes.SELECT });
        return (lastCount as CountType[])[0].count >= 1 || false;
     } catch(error) {
         console.log(error);
     }
     return false;
};

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

export const addCursorToDB = async (cursorObj: CursorCreationAttributes, t: Transaction) => {
    await Cursor.upsert(cursorObj, {transaction: t});
};