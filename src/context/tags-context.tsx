import {createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC} from 'react';
import { ITag } from '../models';
import { TAGS_INITIAL_STATE } from '../constants/initial-data.tsx';

export interface TagsContextType {
  tagsState: ITag[];
  updateTagsState: Dispatch<SetStateAction<ITag[]>>;
}

const TagsContext = createContext<TagsContextType | null>(null);

type TagsContextProviderProps = {
  children: ReactNode;
}

export const TagsContextProvider: FC<TagsContextProviderProps> = ({ children }) => {
  const [tagsState, setTagsState] = useState<ITag[]>(TAGS_INITIAL_STATE);

  const updateTagsState: TagsContextType['updateTagsState'] = (newState) => {
    setTagsState(newState);
  };

  return (
    <TagsContext.Provider value={{ tagsState, updateTagsState }}>
      {children}
    </TagsContext.Provider>
  );
};

export function useTags(): TagsContextType {
  const tags = useContext(TagsContext);
  if (!tags) {
    throw new Error('useTags must be used within a TagsContextProvider');
  }
  return tags;
}
