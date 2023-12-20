import { useState, useMemo } from 'react';

export const useToggleHover = (initialState = false) => {
  const [isHovered, setIsHovered] = useState(initialState);

  const eventHandlers = useMemo(() => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }), []);

  return [isHovered, eventHandlers];
}
