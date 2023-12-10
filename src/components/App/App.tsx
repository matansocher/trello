import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Main } from '@components';
import { UserContextProvider } from '@context';
import './App.scss';

const muiDarkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={muiDarkTheme}>
      <UserContextProvider>
        <Main />
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App;
