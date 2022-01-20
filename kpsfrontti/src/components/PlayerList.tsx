import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { usePlayerNames } from '../hooks/usePlayerNames';
import PlayerGameHistoryModal from './PlayerGameHistoryModal';

const PlayerNameListItem = ({ name, setOpen, setSelectedPlayer }: { name: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, setSelectedPlayer: React.Dispatch<React.SetStateAction<string>> }) => {
    const handleClick = () => {
        setOpen(true);
        setSelectedPlayer(name);
    }
    return (
        <ListItem>
            <ListItemButton onClick={() => handleClick()} sx={{ borderBottom: '1px solid white' }}>
                <ListItemText sx={{ color: 'white' }} primary={name}></ListItemText>
            </ListItemButton>
        </ListItem>
    )
}

const PlayerList = () => {
    const players = usePlayerNames();
    const [open, setOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<string>('');

    return (
        <>
            <PlayerGameHistoryModal setSelectedPlayer={setSelectedPlayer} player={selectedPlayer} setOpen={setOpen} open={open} />
            <List>
                {players.map((name, i) => <PlayerNameListItem name={name} setOpen={setOpen} setSelectedPlayer={setSelectedPlayer} key={i} />)}
            </List></>
    )
}

export default PlayerList;