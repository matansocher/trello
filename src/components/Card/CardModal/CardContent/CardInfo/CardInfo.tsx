import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker, Label, LabelsPicker, ModalWrapper } from '@components';
import { useCurrentCard, useLabels } from '@context';
import { ILabel, IModalStyles } from '@models';
import { firebaseService, utilsService } from '@services';
import './CardInfo.scss';

const datePickerModalStyles: IModalStyles = { width: 350, height: 400 };
const labelsModalStyles: IModalStyles = { width: 320 };

interface ICardDescriptionProps {

}

function CardInfo({  }: ICardDescriptionProps) {
  const { labels } = useLabels();
  const { currentCard: card } = useCurrentCard();
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);

  const handleDueDateChange = async (newValue: Dayjs | null) => {
    firebaseService.updateCardDueDate(card, newValue);
  }

  const handleLabelsChange = async (label: ILabel, isChecked: boolean) => {
    firebaseService.updateCardLabels(card, label, isChecked);
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
    const numOfDaysDueAfterToday = utilsService.getNumOfDaysAfterToday(card.dueDate as string)
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

      <ModalWrapper modalOpen={datePickerModalOpen} closeModal={() => setDatePickerModalOpen(false)} modalStyle={datePickerModalStyles}>
        <DatePicker dueDate={card.dueDate as string} handleChange={handleDueDateChange} setIsOpen={setDatePickerModalOpen} />
      </ModalWrapper>

      <ModalWrapper modalOpen={labelsModalOpen} closeModal={() => setLabelsModalOpen(false)} modalStyle={labelsModalStyles}>
        <LabelsPicker setIsOpen={setLabelsModalOpen} cardLabels={card.labels || []} handleLabelsChange={handleLabelsChange} />
      </ModalWrapper>

    </div>
  )
}

export default CardInfo;
