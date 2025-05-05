import {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {fetchTests} from '@/api/apiService';
import TestCard from '@/components/TestCard';
import {Test} from '@/models/TestModel';
import {getFavorites} from '@/storage/localStorage.ts';

export const FavouritesScreen = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const favourites = getFavorites();
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data: Test[] = await fetchTests();

        setTests(data.filter(item => favourites.includes(item.id)));
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
    padding: 15,
  },
});
