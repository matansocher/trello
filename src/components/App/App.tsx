import './App.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header, Board } from '@components';
import { BoardContextProvider, LabelsContextProvider } from '@context';

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
            <div className='app-wrapper__board'>
              <Board />
            </div>
          </div>
        </ThemeProvider>
      </LabelsContextProvider>
    </BoardContextProvider>
  )
}

export default App;
