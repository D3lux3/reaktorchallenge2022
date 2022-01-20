import { Optional } from 'sequelize/dist';
import * as yup from 'yup';
import { Asserts } from 'yup';

export interface CursorAttributes {
    id: number,
    cursor: string,
    nextCursor: string | undefined | null,
    last: boolean
}

export type CursorCreationAttributes = Optional<CursorAttributes, "id">;

export const playerSchema = yup.object({
    name: yup.string().required(),
    played: yup.string().oneOf(['ROCK', 'PAPER', 'SCISSORS', 'TIE']).required()
}).required();

export const dataSchema = yup.object({
    type: yup.string().required(),
    gameId: yup.string().required(),
    t: yup.number().required(),
    playerA: playerSchema.required(),
    playerB: playerSchema.required()
}).required();


export const dbDataSchema = yup.object({
    type: yup.string().required(),
    gameId: yup.string().required(),
    timestamp: yup.date().required(),
    playerA: yup.string().required(),
    playerB: yup.string().required(),
    aHand: yup.string().required(),
    bHand: yup.string().required(),
    winner: yup.string().required(),
}).required();

export const playerListSchema = yup.array(
    yup.object().shape({
        name: yup.string().required()
    })
);

export const responseSchema = yup.object().shape({
    cursor: yup.string().nullable(),
    data: yup.array(dataSchema).required(),
});

export const dbPlayerSchema = dataSchema.shape({
    id: yup.number().required(),
});

export type databaseDataType = Asserts<typeof dbDataSchema>;
export type playerListType = Asserts<typeof playerListSchema>;
export type PlayerType = Asserts<typeof playerSchema>;
export type DataBasePlayerType = Asserts<typeof dbPlayerSchema>;
export type ResponseDataType = Asserts<typeof dataSchema>;

export type dbTypeNoType = Omit<Asserts<typeof dbDataSchema>, "type">;

export interface dbTypeNoTypeWithId extends dbTypeNoType {
    id: number
}
