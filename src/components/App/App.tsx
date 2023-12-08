import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BoardContextProvider, TagsContextProvider } from '@context';
import { Header, Board } from '@components';
import './App.scss'

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
