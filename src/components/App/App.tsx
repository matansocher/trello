import { useState } from 'react';
import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppWrapper } from '@screens';
import { UserContextProvider } from '@context';
import './App.scss';

function App() {
  const [theme] = useState<PaletteMode>('dark');

  const muiDarkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiDarkTheme}>
      <UserContextProvider>
        <AppWrapper />
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App;
