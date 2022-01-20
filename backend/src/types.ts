import * as yup from 'yup';

export const playerSchema = yup.object().shape({
    name: yup.string().required(),
    played: yup.string().oneOf(['ROCK', 'PAPER', 'SCISSORS', 'TIE'])
});

export const dataSchema = yup.object().shape({
    type: yup.string().required(),
    gameId: yup.string().required(),
    t: yup.number(),
    playerA: playerSchema,
    playerB: playerSchema
});


export type DataType = yup.Asserts<typeof dataSchema>;