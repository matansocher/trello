import { useState, useEffect, useRef } from 'react';
import './EllipsisText.scss';

interface EllipsisTextProps {
  maxLines: number,
  children: string,
}

function EllipsisText({ children, maxLines = 1 }: EllipsisTextProps) {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

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
    <p className='ellipsis-text' ref={containerRef} style={containerStyle}>
      {children}
      {isOverflowed && '...'}
    </p>
  )
}

export default EllipsisText;
