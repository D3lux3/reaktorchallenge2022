import { useEffect, useState } from "react";
import { Game } from "../types";

export const useLiveGames = () => {
  const [games, setGames] = useState(new Map<string, Game>());

  useEffect(() => {
    const ws = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");
    ws.onmessage = (event) => {
      const item: Game = JSON.parse(JSON.parse(event.data.toString()));
      setGames(games => new Map(games.set(item.gameId, item)));
    };
  }, []);


  return Array.from(games.values());
}
