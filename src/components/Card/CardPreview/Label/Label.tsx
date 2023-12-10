import { ILabel } from '@models';
import './Label.scss';

interface ILabelProps {
  label: ILabel;
  isBigLabel: boolean;
}

function Label({ label, isBigLabel = false }: ILabelProps) {
  return (
    <div className={`label-wrapper ${isBigLabel ? 'label-wrapper-big' : ''}`} style={{ backgroundColor: label.backgroundColor }}>
      <span className={`label ${isBigLabel ? 'label-big' : ''}`} style={{ color: label.textColor }}>{label.displayName}</span>
    </div>
  )
}

export default Label;
