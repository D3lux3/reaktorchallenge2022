import Cursor from "./Cursor";
import GameResult from "./GameResult";

void GameResult.sync({ alter: true });
void Cursor.sync({ alter: true });

export {
    Cursor,
    GameResult,
};
