import { ICard, ILabel } from '@models';
import { useLabels } from '@context';
import Label from '../../../CardPreview/Label/Label';
import './CardInfo.scss'

interface ICardDescriptionProps {
  card: ICard;
}

function CardInfo({ card }: ICardDescriptionProps) {
  const { labelsState: labels } = useLabels();

  const renderLabels = () => {
    return card.labels.map((label: string) => {
      const relevantLabel: ILabel = labels.find((originalLabel: ILabel) => originalLabel.id === label) || labels[0];
      return <Label key={label} label={relevantLabel}/>;
    });
  }

  return (
    <div className='card-info'>
      <div className='card-info__labels'>
        <p>Labels</p>
        <div className='card-info__labels__wrapper'>
          {renderLabels()}
        </div>
      </div>
      <div className='card-info__notifications'>
        <div className='card-info__notifications__notification'>
          <p>Label</p>
        </div>
      </div>
    </div>
  )
}

export default CardInfo;
