import { Label } from '@components';
import { useLabels } from '@context';
import { ICard, ILabel } from '@models';
import './CardInfo.scss';

interface ICardDescriptionProps {
  card: ICard;
}

function CardInfo({ card }: ICardDescriptionProps) {
  const { labelsState: labels } = useLabels();
  const isOverdue = card.date && new Date(card.date) < new Date();

  const renderLabels = () => {
    return card.labels.map((label: string) => {
      const relevantLabel: ILabel = labels.find((originalLabel: ILabel) => originalLabel.id === label) || labels[0];
      return <Label key={label} label={relevantLabel}/>;
    });
  }

  return (
    <div className='card-info'>
      <div className='card-info__labels'>
        <p className='subheader'>Labels</p>
        <div className='card-info__labels__wrapper'>
          {renderLabels()}
        </div>
      </div>
      <div className='card-info__due'>
        <div className='card-info__due__section'>
          <p className='subheader'>Due date</p>
          <div className='card-info__due__section__indicator'>
            <p className='date'>{card.date}</p>
            {isOverdue ? <p className='overdue'>Overdue</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardInfo;
