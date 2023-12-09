import { createTheme, ThemeProvider } from '@mui/material/styles';
import { earth } from '@assets';
import { Header, Board } from '@components';
import { BoardContextProvider, LabelsContextProvider } from '@context';
import './App.scss';

const muiDarkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <BoardContextProvider>
      <LabelsContextProvider>
        <ThemeProvider theme={muiDarkTheme}>
          <div className='app-wrapper'>
            <div className='app-wrapper__header'>
              <Header />
            </div>
            <div className='app-wrapper__board' style={{ backgroundImage: `url(${earth})` }}>
              <Board />
            </div>
          </div>
        </ThemeProvider>
      </LabelsContextProvider>
    </BoardContextProvider>
  )
}

export default App;
