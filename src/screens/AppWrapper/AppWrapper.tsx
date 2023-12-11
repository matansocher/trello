import { lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from '@components';
const Board = lazy(() => import('../Board/Board'));
const Home = lazy(() => import('../Home/Home'));
import { BoardContextProvider, LabelsContextProvider } from '@context';
import './AppWrapper.scss';

function AppWrapper() {
  return (
    <BoardContextProvider>
      <LabelsContextProvider>
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
      </LabelsContextProvider>
    </BoardContextProvider>
  )
}

export default AppWrapper;
