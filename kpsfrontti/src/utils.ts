import { PlayerBoxProps } from "./types";

export const getWinnerName = (playerA: PlayerBoxProps, playerB: PlayerBoxProps) => {
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