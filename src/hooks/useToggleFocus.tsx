import { useState, useMemo } from 'react';

export const useToggleFocus = (initialState = false) => {
  const [isFocused, setIsFocused] = useState(initialState);

  const eventHandlers = useMemo(() => ({
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }), []);

  return [isFocused, eventHandlers];
}
