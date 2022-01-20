import { Box, Modal, Stack, SxProps, Typography } from '@mui/material';
import React from 'react';
import { usePlayerGameHistory } from '../hooks/usePlayerGameHistory';
import GameContainer from './GameContainer';

const modalStyle: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll',
    width: '80%',
    bgcolor: '#171721',
    border: '2px solid #000',
    boxShadow: 24,
    height: '50%',
    p: 4,
    borderRadius: 5,
};


const PlayerGameHistoryModal = ({ open, setOpen, player, setSelectedPlayer }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, player: string, setSelectedPlayer: React.Dispatch<React.SetStateAction<string>> }) => {
    if (player && player.length > 0) {
        const playersGameHistory = usePlayerGameHistory(player);

        const handleModalClose = () => {
            setOpen(false);
            setSelectedPlayer('');
        }

        return (
            <>
                <Modal
                    open={open}
                    onClose={() => handleModalClose()}>
                    <Box sx={modalStyle}>
                        <Typography variant='h5' align='center' color={'white'}>
                            Game history of {player}
                        </Typography>

                        <Stack direction="row" justifyContent={'center'} spacing={2}>
                            <Typography variant='subtitle1' align='center' color={'white'}>
                                Total games: {playersGameHistory?.stats.total_matches_played}
                            </Typography>
                            <Typography variant='subtitle1' align='center' color={'white'}>
                                Win ratio: {playersGameHistory?.stats.winratio}%
                            </Typography>
                            <Typography variant='subtitle1' align='center' color={'white'}>
                                Most played hand: {playersGameHistory?.stats.most_played_hand}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            {playersGameHistory?.games.map((game, i) => <GameContainer game={game} key={i} ></GameContainer>)}
                        </Stack>
                    </Box>
                </Modal>
            </>
        );
    }
    return (
        <>
        </>
    );
}
export default PlayerGameHistoryModal;