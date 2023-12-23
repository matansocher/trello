import LinearProgress from '@mui/material/LinearProgress';
import './ProgressBar.scss';

interface IProgressBarProps {
  value: number;
  total: number;
}

function ProgressBar({ value, total }: IProgressBarProps) {

  const getProgress = () => {
    if (value === 0 || total === 0) return 0;

    return Math.round((value / total) * 100);
  }

  return (
    <div className='progress-bar'>
      <div className='progress-bar__left'>
        <span className='percent-num'>{`${getProgress()}%`}</span>
      </div>
      <div className='progress-bar__right'>
        <LinearProgress variant='determinate' value={getProgress()}/>
      </div>
    </div>
  )
}

export default ProgressBar;
