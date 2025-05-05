import {Test} from '@/models/TestModel.ts';

export type RootStackParamList = {
  Tabs: undefined;
  Test: {test: Test};
  TestPass: {test: Test; reset?: boolean};
  TestResult: {testId: string; selectedOptions: string[]};
};
