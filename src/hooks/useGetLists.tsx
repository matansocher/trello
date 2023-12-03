import { useEffect, useState } from 'react';
import { LISTS_MOCK } from '../constants/initial-data.tsx';

export default function useGetLists() {
  const [lists, setLists] = useState(LISTS_MOCK);

  useEffect(() => {
    if (!lists || !lists.length) {
      setLists(LISTS_MOCK);
    }
  }, []);

  return [lists, setLists];
}
