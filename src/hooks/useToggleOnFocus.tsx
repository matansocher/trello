import { useState, useMemo } from 'react';

export const useToggleOnFocus = (initialState = false) => {
  const [isFocused, setIsFocused] = useState(initialState);

  const eventHandlers = useMemo(() => ({
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }), []);

  return [isFocused, eventHandlers];
}
