import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navbar } from '@components';
import { Router } from '@screens';
import { BoardsContextProvider, BoardContextProvider, UserContextProvider, LabelsContextProvider } from '@context';
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
        <BoardsContextProvider>
          <BoardContextProvider>
            <LabelsContextProvider>
              <BrowserRouter>
                <div className='main-wrapper'>
                  <Navbar />
                  <Router />
                </div>
              </BrowserRouter>
            </LabelsContextProvider>
          </BoardContextProvider>
        </BoardsContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App;
