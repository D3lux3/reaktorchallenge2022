import axios from "axios";
import { useEffect, useState } from "react";

export const usePlayerNames = () => {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
      const getPlayerNames = async () => {
          const { data } = await axios.get<string[]>(`/api/players`);
          setPlayers(data);
      }
      getPlayerNames();
  }, []);

    return players;
}
