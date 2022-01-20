import { QueryTypes } from 'sequelize';
import { GameResult } from '../models';
import { playerListSchema } from '../types';
import { sequelize } from '../util/database';
import { databaseFormatToData } from '../util/utils';

export const getAllPlayers = async () => {
    const names = await sequelize.query(
        `SELECT X.player_a AS name FROM gameresults X
         UNION
         SELECT Y.player_b FROM gameresults Y
         ORDER BY name;`,
        { type: QueryTypes.SELECT });

    const validated = await playerListSchema.validate(names);
    return validated?.map((n) => n.name);
};

export const getGamesByPlayer = async (name: string) => {
    try {
        const gameHistory = await sequelize.query(`
        SELECT *
        FROM gameresults
        WHERE player_a='${name}' OR player_b='${name}'
        ORDER BY timestamp DESC;`,
            { type: QueryTypes.SELECT, model: GameResult, mapToModel: true });

        const gameStats = await sequelize.query(`
        WITH gameratio AS (
            SELECT
            ROUND(COUNT(*) / ((SELECT COUNT(*) FROM gameresults WHERE player_a = '${name}' OR player_b = '${name}')::decimal) * 100, 2) as winratio
            FROM gameresults
            WHERE winner='${name}'
        ),
         totalgames AS (
            SELECT COUNT(*) AS total_matches_played FROM gameresults WHERE player_a = '${name}' OR player_b = '${name}'
        ),
        mostplayed AS (
            (SELECT mode()  WITHIN GROUP ( ORDER BY hands ) AS most_played_hand FROM
            (SELECT a_hand AS hands from gameresults WHERE player_a = '${name}'
            UNION ALL
            SELECT b_hand from gameresults WHERE player_b = '${name}') AS all_hands)
        )
        SELECT * FROM gameratio, totalgames, mostplayed;`,
            { type: QueryTypes.SELECT });
        
        return { stats: gameStats[0], games: gameHistory.map((player) => databaseFormatToData(player)) };
    } catch (error) {
        return error;
    }

};


