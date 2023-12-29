import { Tooltip } from 'react-tooltip';
import { useCurrentCard } from '@context';
import { IFooterIcon } from '@models';
import './FooterIcon.scss';

interface IFooterIconProps {
  footerIcon: IFooterIcon;
}

function FooterIcon({ footerIcon }: IFooterIconProps) {
  const { currentCard: card } = useCurrentCard();

  const uniqueClassId = `${card.id}_${footerIcon.id}`;
  return (
    <>
    <div className={`card-preview__footer__icon ${uniqueClassId}`}>
      {footerIcon.icon}
    </div>
    <Tooltip
      anchorSelect={`.${uniqueClassId}`}
      content={footerIcon.tooltipText}
      style={{ padding: '2px 6px', zIndex: 2, backgroundColor: '#9fadbc', color: '#1d2125', fontSize: 12 }}
      place='bottom'
      positionStrategy='fixed'
    />
  </>
  )
}

export default FooterIcon;
