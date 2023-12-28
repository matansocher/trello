import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker, Label, LabelsPicker } from '@components';
import { useBoard } from '@context';
import { useGetBoard, useGetLabels } from '@hooks';
import { ICard, ILabel, IList } from '@models';
import { dataService, utilsService } from '@services';
import './CardInfo.scss';

interface ICardDescriptionProps {
  list: IList;
  card: ICard;
}

function CardInfo({ list, card }: ICardDescriptionProps) {
  const { labels } = useGetLabels();
  const { updateBoardState } = useBoard();
  const { board } = useGetBoard();
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);

  const handleDueDateChange = (newValue: Dayjs | null) => {
    const cardToSave = dataService.updateCardDueDate(card, newValue);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const handleLabelsChange = (label: ILabel, isChecked: boolean) => {
    const cardToSave = dataService.updateCardLabels(card, label, isChecked);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const renderLabelsSection = () => {
    if (!card.labels?.length || !labels.length) return;
    return (
      <div className='card-info__labels'>
        <p className='subheader'>Labels</p>
        <div className='card-info__labels__wrapper'>
          {card?.labels?.map((label: string) => {
            const relevantLabel: ILabel = labels.find((originalLabel: ILabel) => originalLabel.id === label) || labels[0];
            return <Label key={label} label={relevantLabel} isBigLabel={true}/>;
          })}
          <div className='card-info__labels__wrapper__plus' onClick={() => setLabelsModalOpen(true)}>+</div>
        </div>
      </div>
    )
  }

  const renderDueDateSection = () => {
    return (
      <>
        <div className='card-info__due'>
          <div className='card-info__due__section'>
            <p className='subheader'>Due date</p>
            <div className='card-info__due__section__indicator' onClick={() => setDatePickerModalOpen(true)}>
              <p className='date'>{card.dueDate}</p>
              {getDueDateSideLabel()}
            </div>
          </div>
        </div>
      </>
    )
  }

  const getDueDateSideLabel = () => {
    const numOfDaysDueAfterToday = utilsService.getNumOfDaysDueAfterToday(card.dueDate as string)
    if (numOfDaysDueAfterToday === 0) { // today
      return <p className='side-label today'>Today</p>;
    }
    if (numOfDaysDueAfterToday < 0) { // overdue
      return <p className='side-label overdue'>Overdue</p>;
    }
  }

  return (
    <div className='card-info'>
      {card.labels?.length ? renderLabelsSection() : null}
      {card.dueDate?.length ? renderDueDateSection(): null}
      <DatePicker handleChange={handleDueDateChange} card={card} isOpen={datePickerModalOpen} setIsOpen={setDatePickerModalOpen} />
      <LabelsPicker handleLabelsChange={handleLabelsChange} card={card} isOpen={labelsModalOpen} setIsOpen={setLabelsModalOpen} />
    </div>
  )
}

export default CardInfo;
