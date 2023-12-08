import { ILabel } from '@models';
import './Label.scss'

interface ILabelProps {
  label: ILabel
}

function Label({ label }: ILabelProps) {
  return (
    <div className='label-wrapper' style={{ backgroundColor: label.backgroundColor }}>
      <span className='label' style={{ color: label.textColor }}>{label.displayName}</span>
    </div>
  )
}

export default Label;
