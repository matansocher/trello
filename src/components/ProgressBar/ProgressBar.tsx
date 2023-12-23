import LinearProgress from '@mui/material/LinearProgress';
import './ProgressBar.scss';

interface IProgressBarProps {
  value: number;
  total: number;
}

function ProgressBar({ value, total }: IProgressBarProps) {
  const progress = (value / total) * 100;
  return (
    <div className='progress-bar'>
      <div className='progress-bar__left'>
        <span className='percent-num'>{`${Math.round(progress)}%`}</span>
      </div>
      <div className='progress-bar__right'>
        <LinearProgress variant='determinate' value={progress}/>
      </div>
    </div>
  )
}

export default ProgressBar;
