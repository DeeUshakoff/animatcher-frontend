import {useCallback, useEffect, useState} from 'react';
import {useMMKVObject} from 'react-native-mmkv';
import {TestResult} from '@/models/TestModel';

const RESULTS_KEY = 'testResults';

export const useTestResult = () => {
  const [resultsMap, setResultsMap] =
    useMMKVObject<Record<string, TestResult>>(RESULTS_KEY);
  const [results, setResults] = useState<Record<string, TestResult>>(
    resultsMap ?? {},
  );

  useEffect(() => {
    if (resultsMap) {
      setResults(resultsMap);
    }
  }, [resultsMap]);

  const saveResult = useCallback(
    (result: TestResult) => {
      const updated = {
        ...(resultsMap ?? {}),
        [result.testId]: result,
      };
      setResultsMap(updated);
    },
    [resultsMap, setResultsMap],
  );

  const getResult = useCallback(
    (testId: string): TestResult | undefined => {
      return resultsMap?.[testId];
    },
    [resultsMap],
  );

  const deleteResult = useCallback(
    (testId: string) => {
      if (!resultsMap) {return;}
      const updated = {...resultsMap};
      delete updated[testId];
      setResultsMap(updated);
    },
    [resultsMap, setResultsMap],
  );

  return {
    results,
    getResult,
    saveResult,
    deleteResult,
  };
};
