import {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {fetchTests} from '@/api/apiService';
import TestCard from '@/components/TestCard';
import {Test} from '@/models/TestModel';

export const HomeScreen = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchTests();
        setTests(data);
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
      <View style={styles.container}>
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
    <View style={{flex: 1, padding: 16}}>
      {tests.map(test => (
        <TestCard key={test.id} test={test} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
