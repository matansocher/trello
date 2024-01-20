import { useEffect, useState } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { ArchivedCard, Loader } from '@components';
import { LoaderSize } from '@constants';
import { useBoard } from '@context';
import { IArchivedCard } from '@models';
import { firebaseService } from '@services';
import './CardsArchive.scss';

interface ICardsArchiveProps {
  handleCloseCardsArchiveModal: () => void;
}

function CardsArchive({ handleCloseCardsArchiveModal }: ICardsArchiveProps) {
  const { boardState: board } = useBoard();
  const [archivedCards, setArchivedCards] = useState<IArchivedCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if (!board.id) return;

    const fetchArchivedCards = async () => {
      setIsLoading(true);
      const archivedCards = await firebaseService.getArchivedCards(board.id as string) as IArchivedCard[];
      setArchivedCards(archivedCards);
      setIsLoading(false);
    }

    fetchArchivedCards();
  },[board.id]);

  const renderCards = () => {
    return archivedCards?.map((card: IArchivedCard) => {
      return (
        <ArchivedCard key={card.id} card={card} handleCloseCardsArchiveModal={handleCloseCardsArchiveModal} />
      );
    })
  }

  return (
    <div className='archive-wrapper'>
      {isLoading ? <div className='loader-container'><Loader size={LoaderSize.M}/></div> : null}
      <div className='archive-wrapper__header'>
        <CloseIcon onClick={handleCloseCardsArchiveModal} />
        <p>Archive</p>
      </div>
      <div className='archive-wrapper__content'>
        {renderCards()}
      </div>
    </div>
  )
}

export default CardsArchive;
