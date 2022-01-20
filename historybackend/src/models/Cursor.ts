import { DataTypes, Model } from "sequelize";
import { CursorAttributes, CursorCreationAttributes } from "../types";
import { sequelize } from "../util/database";

class Cursor extends Model<CursorAttributes, CursorCreationAttributes>
implements CursorAttributes {
    declare id: number;
    declare cursor: string;
    declare nextCursor: string;
    declare last: boolean;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}
Cursor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cursor: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nextCursor: {
        type: DataTypes.STRING,
        unique: true
    },
    last: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'cursor'
});

export default Cursor;