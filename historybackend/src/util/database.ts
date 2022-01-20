import { Sequelize } from "sequelize";
import { dbUri } from "./config";

export const sequelize = new Sequelize(dbUri, {
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

export const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }

    return null;
};