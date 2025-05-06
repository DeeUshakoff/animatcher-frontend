import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {fetchTests} from '@/api/apiService';
import TestCard from '@/components/TestCard';
import {Test} from '@/models/TestModel';
import {useTestResult} from '@/hooks/useTestResult.ts';

export const HistoryScreen = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {results} = useTestResult();
  const loadData = async () => {
    try {
      setLoading(true);
      const data: Test[] = await fetchTests();
      console.log(results);
      setTests(data.filter(item => results[item.id] != null));
    } catch (err) {
      setError(err.message || 'Failed to load tests');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={loading} onRefresh={loadData}/>
    }>
      {tests.map(test => (
        <TestCard key={test.id} test={test} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
});
