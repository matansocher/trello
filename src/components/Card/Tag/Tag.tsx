import { ITag } from '@models';
import './Tag.scss'

interface ITagProps {
  tag: ITag
}

function Tag({ tag }: ITagProps) {
  return (
    <div className='tag-wrapper' style={{ backgroundColor: tag.backgroundColor }}>
      <p className='tag' style={{ color: tag.textColor }}>{tag.displayName}</p>
    </div>
  )
}

export default Tag;
