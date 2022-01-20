import { Cursor } from "../models";
import { dbTypeNoType, PlayerType, ResponseDataType } from "../types";

export const getWinner = (playerA: PlayerType, playerB: PlayerType) => {
    if (playerA.played === playerB.played) {
        return "TIE";
    } else if (playerA.played === "ROCK" && playerB.played === "SCISSORS") {
        return playerA.name;
    } else if (playerA.played === "PAPER" && playerB.played === "ROCK") {
        return playerA.name;
    } else if (playerA.played === "SCISSORS" && playerB.played === "PAPER") {
        return playerA.name;
    }
    return playerB.name;
}; 

export const dataToDatabaseFormat = (game: ResponseDataType) => {
    return {
            gameId: game.gameId,
            playerA: game.playerA.name,
            playerB: game.playerB.name,
            aHand: game.playerA.played,
            bHand: game.playerB.played,
            timestamp: unixToTime(game.t),
            winner: getWinner(game.playerA, game.playerB)
        };
};

export const databaseFormatToData = (game: dbTypeNoType) => {
    const a  = {
        name: game.playerA,
        played: game.aHand
    };
    const b  = {
        name: game.playerB,
        played: game.bHand
    };
    return {
            type: "GAME_RESULT",
            gameId: game.gameId,
            playerA: a,
            playerB: b,
            t: game.timestamp,
            winner: getWinner(a, b)
        };
};

export const unixToTime = (time: number) => {
    return new Date(time);
};


export const getRowLimit = async () => {
    return process.env.DATABASE_ROW_LIMIT || 10000 - await Cursor.count();
};