import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC } from 'react';
import { LABELS_INITIAL_STATE } from '@constants';
import { ILabel } from '@models';

interface ILabelsContextType {
  labelsState: ILabel[];
  updateLabelsState: Dispatch<SetStateAction<ILabel[]>>;
}

const LabelsContext = createContext<ILabelsContextType | null>(null);

type LabelsContextProviderProps = {
  children: ReactNode;
}

export const LabelsContextProvider: FC<LabelsContextProviderProps> = ({ children }) => {
  const [labelsState, setLabelsState] = useState<ILabel[]>(LABELS_INITIAL_STATE);

  const updateLabelsState: ILabelsContextType['updateLabelsState'] = (newState) => {
    setLabelsState(newState);
  };

  return (
    <LabelsContext.Provider value={{ labelsState, updateLabelsState }}>
      {children}
    </LabelsContext.Provider>
  );
};

export function useLabels(): ILabelsContextType {
  const labels = useContext(LabelsContext);
  if (!labels) {
    throw new Error('useLabels must be used within a LabelsContextProvider');
  }
  return labels;
}
