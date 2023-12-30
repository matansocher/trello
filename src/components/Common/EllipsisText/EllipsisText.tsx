import { useState, useEffect, useRef } from 'react';
import './EllipsisText.scss';

interface IEllipsisTextProps {
  maxLines: number;
  children: string;
}

function EllipsisText({ children, maxLines = 1 }: IEllipsisTextProps) {
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
    <p className='ellipsis-text' ref={containerRef as any} style={containerStyle as any}>
      {children}
      {isOverflowed && '...'}
    </p>
  )
}

export default EllipsisText;
