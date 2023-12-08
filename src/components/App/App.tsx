import './App.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header, Board } from '../index';
import { BoardContextProvider } from '../../context/board-context';
import { TagsContextProvider } from '../../context/tags-context';

const muiDarkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <BoardContextProvider>
      <TagsContextProvider>
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
      </TagsContextProvider>
    </BoardContextProvider>
  )
}

export default App;
