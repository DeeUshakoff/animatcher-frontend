import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { fetchTests } from '@/api/apiService';
import TestCard from '@/components/TestCard';

interface TestItem {
  id: string;
  title: string;
  description: string
}

export const HomeScreen = () => {
  const [tests, setTests] = useState<TestItem[]>([]);
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {tests.map(test => (
        <TestCard id={test.id} label={test.title} description={test.description}/>
      ))}
    </View>
  );
};