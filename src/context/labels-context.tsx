import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC } from 'react';
import { TAGS_INITIAL_STATE } from '@constants';
import { ILabel } from '@models';

interface LabelsContextType {
  labelsState: ILabel[];
  updateLabelsState: Dispatch<SetStateAction<ILabel[]>>;
}

const LabelsContext = createContext<LabelsContextType | null>(null);

type LabelsContextProviderProps = {
  children: ReactNode;
}

export const LabelsContextProvider: FC<LabelsContextProviderProps> = ({ children }) => {
  const [labelsState, setLabelsState] = useState<ILabel[]>(TAGS_INITIAL_STATE);

  const updateLabelsState: LabelsContextType['updateLabelsState'] = (newState) => {
    setLabelsState(newState);
  };

  return (
    <LabelsContext.Provider value={{ labelsState, updateLabelsState }}>
      {children}
    </LabelsContext.Provider>
  );
};

export function useLabels(): LabelsContextType {
  const labels = useContext(LabelsContext);
  if (!labels) {
    throw new Error('useLabels must be used within a LabelsContextProvider');
  }
  return labels;
}
