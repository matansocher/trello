import { useEffect, useState } from 'react';
import { TAGS_MOCK } from '../constants/initial-data.tsx';

export default function useGetTags() {
  const [tags, setTags] = useState(TAGS_MOCK);

  useEffect(() => {
    setTags(TAGS_MOCK);
  }, []);

  return [tags];
}
