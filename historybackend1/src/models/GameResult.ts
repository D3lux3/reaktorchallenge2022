import { DataTypes, Model } from "sequelize";
import { dbTypeNoType, dbTypeNoTypeWithId } from "../types";
import { sequelize } from "../util/database";


class GameResult extends Model<dbTypeNoTypeWithId,dbTypeNoType>
implements dbTypeNoType {
    declare id: number;
    declare gameId: string;
    declare playerA: string;
    declare aHand: string;
    declare playerB: string;
    declare bHand: string;
    declare timestamp: Date;
    declare winner: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}
GameResult.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gameId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    playerA: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aHand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playerB: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bHand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    winner: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    underscored: true,
    tableName: 'gameresults',
    timestamps: false,
    modelName: 'gameresult'
});

export default GameResult;