import { Card, Grid } from '@mui/material';
import React from 'react';
import PlayerBox from './PlayerBox';
import { Game } from '../types';
import InfoBox from './InfoBox';
import { getWinnerName } from '../utils';

const GameContainer = ({ game }: { game: Game }) => {
    const winner = getWinnerName(game.playerA, game.playerB);

    return (
        <Card variant="outlined">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <PlayerBox name={game.playerA.name} played={game.playerA.played} winner={winner} ></PlayerBox>
                </Grid>
                <Grid item xs={4} >
                    <InfoBox game={game} win={winner}></InfoBox>
                </Grid>
                <Grid item xs={4}>
                    <PlayerBox name={game.playerB.name} played={game.playerB.played} winner={winner} ></PlayerBox>
                </Grid>
            </Grid>
        </Card>
    );
}

export default GameContainer;