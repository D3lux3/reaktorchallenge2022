import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const dbUri = process.env.DATABASE_URL || "";