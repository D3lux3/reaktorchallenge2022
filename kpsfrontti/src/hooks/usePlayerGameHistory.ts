import axios from "axios";
import { useEffect, useState } from "react";
import { GameHistoryType } from "../types";

export const usePlayerGameHistory = (name: string) => {
    const [gameHistory, setGameHistory] = useState<GameHistoryType>();
    useEffect(() => {
        const getPlayerGameHistory = async () => {
            const { data } = await axios.get<GameHistoryType>(`${process.env.REACT_APP_BACKEND_URI}/players/${name}`);
            setGameHistory(data);
        }
        getPlayerGameHistory();
    }, []);
    return gameHistory;
}
