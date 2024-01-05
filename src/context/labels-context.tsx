import { createContext, useContext, useState, ReactNode, FC, SetStateAction } from 'react';
import { ILabel } from '@models';

interface ILabelsContextType {
  labels: ILabel[];
  updateLabelsState: (newState: SetStateAction<ILabel[]>) => void;
}

const LabelsContext = createContext<ILabelsContextType | null>(null);

type LabelsContextProviderProps = {
  children: ReactNode;
}

export const LabelsContextProvider: FC<LabelsContextProviderProps> = ({ children }) => {
  const [labels, setLabels] = useState<ILabel[]>([]);

  const updateLabelsState: ILabelsContextType['updateLabelsState'] = (newState: SetStateAction<ILabel[]>) => {
    setLabels(newState);
  };

  return (
    <LabelsContext.Provider value={{ labels, updateLabelsState }}>
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
