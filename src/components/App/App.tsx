import './App.scss'
import { Header, Board } from '../index';
import { BoardContextProvider } from '../../context/board-context';
import { TagsContextProvider } from '../../context/tags-context';

function App() {
  return (
    <BoardContextProvider>
      <TagsContextProvider>
        <div className='app-wrapper'>
          <div className='app-wrapper__header'>
            <Header />
          </div>
          <div className='app-wrapper__board'>
            <Board />
          </div>
        </div>
      </TagsContextProvider>
    </BoardContextProvider>
  )
}

export default App;
