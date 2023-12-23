import { useState, useEffect, useRef } from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import './Textarea.scss';

interface ITextareaProps {
  maxLines: number;
  children: string;
}

function Textarea({ children, maxLines = 1 }: ITextareaProps) {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current as any;

    if (container) {
      const containerStyles = window.getComputedStyle(container);
      const lineHeight = parseInt(containerStyles.lineHeight);

      const maxHeight = lineHeight * maxLines;
      const actualHeight = container.scrollHeight;

      setIsOverflowed(actualHeight > maxHeight);
    }
  }, [children, maxLines]);

  const containerStyle = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    WebkitLineClamp: maxLines,
  };

  return (
    <BaseTextareaAutosize
      maxRows={4}
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua."
    />
  )
}

export default Textarea;
