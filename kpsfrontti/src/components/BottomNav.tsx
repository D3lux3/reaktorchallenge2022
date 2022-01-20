import { BottomNavigation, BottomNavigationAction, createTheme, SxProps } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { Link } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { Groups } from '@mui/icons-material';

const navTheme = createTheme({
  palette: {
    primary: {
      main: '#fefefd'
    },
    text: {
      secondary: '#674c85'
    }
  }
})

const navStyle: SxProps = {
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 500,
  backgroundColor: '#280454',
  borderRadius: '20px 20px 0 0'
}

const BottomNav = () => {
  const [value, setValue] = React.useState(0);

  return (
    <ThemeProvider theme={navTheme}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={navStyle}
      >
        <BottomNavigationAction component={Link} to="/" label="Current Games" icon={<RestoreIcon />}></BottomNavigationAction>
        <BottomNavigationAction component={Link} to="/players"  label="Players" icon={<Groups />} > </BottomNavigationAction>
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default BottomNav;