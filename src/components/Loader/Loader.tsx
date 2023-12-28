import { LoaderSize } from '@constants';
import './Loader.scss';

interface ILoaderProps {
  size: LoaderSize;
}

function Loader({ size = LoaderSize.S }: ILoaderProps) {

  const getSizeAttributes = (size: LoaderSize): any => {
    switch (size) {
      case LoaderSize.S:
        return { fontSize: '20px' };
      case LoaderSize.M:
        return { fontSize: '30px' };
      case LoaderSize.L:
        return { fontSize: '50px' };
      default:
        return getSizeAttributes(LoaderSize.S);
    }
  }

  const styles = getSizeAttributes(size);

  return (
    <div className='loader-wrapper' style={styles}>

    </div>
  )
}

export default Loader;
