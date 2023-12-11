import { Label } from '@components';
import { useLabels } from '@context';
import { ICard, ILabel } from '@models';
import './CardInfo.scss';

interface ICardDescriptionProps {
  card: ICard;
}

function CardInfo({ card }: ICardDescriptionProps) {
  const { labelsState: labels } = useLabels();

  const renderLabelsSection = () => {
    return (
      <div className='card-info__labels'>
        <p className='subheader'>Labels</p>
        <div className='card-info__labels__wrapper'>
          {card?.labels?.map((label: string) => {
            const relevantLabel: ILabel = labels.find((originalLabel: ILabel) => originalLabel.id === label) || labels[0];
            return <Label key={label} label={relevantLabel} isBigLabel={true}/>;
          })}
        </div>
      </div>
    )
  }

  const renderDueDateSection = () => {
    return (
      <div className='card-info__due'>
        <div className='card-info__due__section'>
          <p className='subheader'>Due date</p>
          <div className='card-info__due__section__indicator'>
            <p className='date'>{card.dueDate}</p>
            {getDueDateSideLabel()}
          </div>
        </div>
      </div>
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
    </div>
  )
}

export default CardInfo;
