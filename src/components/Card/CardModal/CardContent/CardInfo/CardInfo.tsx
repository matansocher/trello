import { useState } from 'react';
import {DatePicker, Label, LabelsPicker} from '@components';
import {useBoard, useLabels} from '@context';
import { ICard, ILabel, IList } from '@models';
import './CardInfo.scss';
import dayjs, {Dayjs} from "dayjs";
import {dataService} from "@services";

interface ICardDescriptionProps {
  list: IList;
  card: ICard;
}

function CardInfo({ list, card }: ICardDescriptionProps) {
  const { labelsState: labels } = useLabels();
  const { boardState: board, updateBoardState } = useBoard();
  // date picker
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  // labels picker
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);

  const handleDueDateChange = (newValue: Dayjs | null) => {
    const dueDate = newValue ? newValue.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
    const cardToSave = { ...card, dueDate };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const handleLabelsChange = (isChecked: boolean, label: ILabel) => {
    const currentLabels = card.labels || [];
    const newLabels = isChecked ? [...currentLabels, label.id] : currentLabels.filter((labelId: string) => labelId !== label.id);
    const cardToSave: ICard = { ...card, labels: newLabels };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const renderLabelsSection = () => {
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
    const numOfDaysDueAfterToday = new Date(card.dueDate as any).getDate() - new Date().getDate();
    if (numOfDaysDueAfterToday === 0) { // today
      return <p className='side-label today'>Today</p>;
    }
    if (numOfDaysDueAfterToday > 0) { // overdue
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
