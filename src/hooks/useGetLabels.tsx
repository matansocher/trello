import { useState, useEffect } from 'react';
import { ILabel } from '@models';
import { firebaseService } from '@services';

export const useGetLabels = () => {
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  useEffect(()=>{
    const fetchLabels = async () => {
      try {
        setLoading(true)
        const labelsRes = await firebaseService.getLabels() as ILabel[];
        setLabels(labelsRes)
      } catch(err) {
        setError(err as any)
      } finally {
        setLoading(false)
      }
    }

    fetchLabels();
  },[])

  return { labels, loading, error };
}
