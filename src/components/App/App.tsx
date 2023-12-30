import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  Header } from '@components';
import { Board, Home } from '@screens';
import { BoardsContextProvider, BoardContextProvider, UserContextProvider } from '@context';
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
            <BrowserRouter>
              <div className='main-wrapper'>
                <Header />
                <div className='main-wrapper__board'>
                  <Routes>
                    <Route path='/boards/:boardId' element={<Board />} />
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Navigate to='/' />} />
                  </Routes>
                </div>
              </div>
            </BrowserRouter>
          </BoardContextProvider>
        </BoardsContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App;
