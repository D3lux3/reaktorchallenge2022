import { Stack } from '@mui/material';
import React from 'react';
import GameContainer from './GameContainer';
import { Game } from '../types';

const CurrentGames = ({games}: {games: Game[]}) => {
    return (
        <Stack spacing={1}>
            {games.map((game, i) => <GameContainer game={game} key={i} />)}
        </Stack>
    );
}

export default CurrentGames;