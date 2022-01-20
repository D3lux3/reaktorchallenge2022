import { Box, Chip, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { Game } from '../types';

interface infoPropTypes {
    game: Game,
    win: string
}

const InfoBox = (props: infoPropTypes) => {

    if (props.game.type === "GAME_RESULT") {
        return (
            <Box display='flex' alignItems="center" justifyContent="center" flexDirection={"column"}>
                <Typography variant="h6">Result</Typography>
                <Chip label={props.win} sx={{backgroundColor: "#be2edd"}} />
                <Typography variant="subtitle1">{moment(props.game.t).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </Box>
        )
    } else {
        return (
            <Box display='flex' alignItems="center" justifyContent="center" flexDirection={"column"}>
                <Typography variant="h6">vs</Typography>
                <Chip label="ongoing" sx={{backgroundColor: "#f9ca24"}} />
                <Typography variant="subtitle1">{moment(props.game.t).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </Box>
        )
    }

}

export default InfoBox;