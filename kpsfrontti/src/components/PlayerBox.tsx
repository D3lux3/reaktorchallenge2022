import { Box, Typography } from '@mui/material';
import React from 'react';

const PlayerBox = ({ name, played, winner }: { name: string, played: string | undefined, winner: string }) => {
    const borderColor = winner === name
        ? "#44bd32"
        : winner === 'TIE' ? "#f39c12" : "#e84118";

    const emoji = (hand: string | undefined) => {
        switch (hand) {
            case "SCISSORS":
                return "โ๏ธ";
            case "ROCK":
                return "๐๐ฝ";
            case "PAPER":
                return "๐งป";
            default:
                return "โณ";
        }
    }

    return (
        <Box display='flex'
            alignItems="center"
            justifyContent="center"
            flexDirection={'column'}
            sx={{ winner } && { borderBottom: `5px solid ${borderColor}` }}>
            <Typography variant="h4">{emoji(played)}</Typography>
            <Typography variant="subtitle1">{played}</Typography>
            <Typography variant="h6">{name}</Typography>
        </Box>
    )
}
export default PlayerBox;