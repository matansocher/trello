import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { earth } from '@assets';
import { Header, Board } from '@components';
import { BoardContextProvider, LabelsContextProvider } from '@context';
import './Main.scss';

function Main() {
  return (
    <BoardContextProvider>
      <LabelsContextProvider>
        <BrowserRouter>
          <div className='main-wrapper'>
            <div className='main-wrapper__header'>
              <Header />
            </div>
            <div className='main-wrapper__board' style={{ backgroundImage: `url(${earth})` }}>
              <Routes>
                <Route path='/boards/:boardId' element={<Board />} />
                <Route path='*' element={<p>FUCKFUCKFUCKFUCKFUCKFUCKFUCKFUCKFUCKFUCKFUCKFUCK</p>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </LabelsContextProvider>
    </BoardContextProvider>
  )
}

export default Main;
