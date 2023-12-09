import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Label } from '@components';
import { useLabels } from '@context';
import { ICard, ILabel } from '@models';
import './CardInfo.scss';

interface ICardDescriptionProps {
  card: ICard;
}

function CardInfo({ card }: ICardDescriptionProps) {
  const { labelsState: labels } = useLabels();

  const handleWatchClick = () => {
    console.log('handleWatchClick');
  }

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
      <div className='card-info__notifications'>
        <div className='card-info__notifications__notification'>
          <p className='subheader'>Notifications</p>
          <button className='card-info__notifications__notification__button' onClick={handleWatchClick}>
            <VisibilityOutlinedIcon />
            Watch
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardInfo;
