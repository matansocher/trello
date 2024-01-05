import { useState, useEffect } from 'react';
import { ILabel } from '@models';
import { firebaseService } from '@services';


// $$$$$$$$$$$$$$$$$$$$$$$$ NOT USED $$$$$$$$$$$$$$$$$$$$$$$$
export const useGetDefaultLabels = () => {
  const [labels, setLabels] = useState<ILabel[]>([]);

  useEffect(()=>{
    const fetchLabels = async () => {
      try {
        const labelsRes = await firebaseService.getDefaultLabels() as ILabel[];
        setLabels(labelsRes)
      } catch(err) {
        console.log('failed to fetch labels')
      }
    }

    fetchLabels();
  },[])

  return { labels };
}
