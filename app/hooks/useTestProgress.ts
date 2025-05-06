import {useMMKVObject} from 'react-native-mmkv';
import {TestProgress} from '@/models/TestModel';

export const useTestProgress = (testId: string) => {
  const key = `progress:${testId}`;
  const [progress, setProgress] = useMMKVObject<TestProgress>(key);

  const updateProgress = (data: Partial<TestProgress>) => {
    setProgress(prev => ({
      ...prev,
      ...data,
      testId,
    }));
  };

  const resetProgress = () => setProgress(undefined);

  return {progress, updateProgress, resetProgress};
};
