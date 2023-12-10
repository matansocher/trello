import { earth } from '@assets';
import { Header, Board } from '@components';
import { BoardContextProvider, LabelsContextProvider } from '@context';
import './Main.scss';

function Main() {
  return (
    <BoardContextProvider>
      <LabelsContextProvider>
        <div className='main-wrapper'>
          <div className='main-wrapper__header'>
            <Header />
          </div>
          <div className='main-wrapper__board' style={{ backgroundImage: `url(${earth})` }}>
            <Board />
          </div>
        </div>
      </LabelsContextProvider>
    </BoardContextProvider>
  )
}

export default Main;
