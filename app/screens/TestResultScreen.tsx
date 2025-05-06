import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {passTest} from '@/api/apiService.tsx';
import {TestResult} from '@/models/TestModel.ts';
import {TextStyles} from '@theme/fonts.ts';
import Button from '@components/Button.tsx';
import {useTestResult} from '@/hooks/useTestResult.ts';

export const TestResultScreen = () => {
  const {params} = useRoute<any>();

  const navigation = useNavigation();
  const {testId, selectedOptions} = params;

  const [result, setResult] = useState<TestResult>();
  const {saveResult} = useTestResult();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleTestPage = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await passTest(testId, selectedOptions);

        const newResult: TestResult = {
          testId: testId,
          name: data.name,
          selectedOptions: selectedOptions,
          resultDescription: data.name,
        };
        setResult(newResult);
        saveResult(newResult);

        navigation.setOptions({
          headerTitle: () => (
            <Text style={TextStyles.headline.default}>Test results</Text>
          ),
        });
      } catch (err) {
        setError(err.message || 'Failed to load tests');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={TextStyles.default.default}>You are</Text>
        <Text style={TextStyles.headline.large}>{result?.name}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button variant={'grey'} onPress={handleTestPage}>
            test's page
          </Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button>share</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingBottom: 50,
    gap: 15,
  },
  optionsContainer: {
    gap: 5,
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
  },
  bottomContainer: {
    gap: 50,
  },
  optionItemContainer: {
    marginBottom: 10,
  },
});
