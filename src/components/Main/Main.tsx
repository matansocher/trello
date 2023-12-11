import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@components';
const Board = lazy(() => import('../../screens/Board/Board'));
const Home = lazy(() => import('../../screens/Home/Home'));
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
            <div className='main-wrapper__board'>
              <Routes>
                <Route path='/boards/:boardId' element={<Board />} />
                <Route path='/' element={<Home />} />
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
