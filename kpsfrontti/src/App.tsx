import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom"
import React from 'react';
import BottomNav from './components/BottomNav';
import CurrentGames from './components/CurrentGames';
import PlayerList from './components/PlayerList';
import { useLiveGames } from './hooks/useLiveGames';
import './styles/App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {
  const games = useLiveGames();

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/" element={<CurrentGames games={games.slice(games.length >= 50 ? games.length - 50 : 0, games.length).reverse()} />} />
          <Route path="/players" element={<PlayerList />} />
          <Route path="/players/:name" element={<PlayerList />} />
        </Routes>
        <BottomNav />

      </ThemeProvider>
    </Router >

  );
}

export default App;
