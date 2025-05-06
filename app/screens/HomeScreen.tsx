import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  fetchTests,
  getTestsWithFilters,
  searchTestsByName,
} from '@/api/apiService';
import TestCard from '@/components/TestCard';
import {ColorVariants, ApplicationBorderRadius} from '@/theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FiltrationWindow from '@/components/FiltrationWindow';
import {storage} from '@/storage/localStorage.ts';

interface TestItem {
  id: string;
  title: string;
  description: string;
}

export const HomeScreen = () => {
  const [initialTests, setInitialTests] = useState<TestItem[]>([]);
  const [filteredTests, setFilteredTests] = useState<TestItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState<'default' | 'title' | 'date'>(
    'default',
  );
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const [filtersUsing, setFiltersUsing] = useState(false);

  const loadTests = useCallback(async () => {
    try {
      setLoading(true);
      const franchises = storage.getString('franchises');
      const tags = storage.getString('tags');
      const sortDirection = storage.getString('sortDirection');

      const tests =
        franchises || tags || sortDirection
          ? await getTestsWithFilters(franchises, tags, sortDirection)
          : await fetchTests();

      const hasActive = !!(franchises || tags || sortDirection);
      setFiltersUsing(hasActive);
      setInitialTests(tests);
      setFilteredTests(tests);
    } catch (err) {
      setError(err.message || 'Failed to load tests');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFiltersChanged = useCallback(() => {
    loadTests();
  }, [loadTests]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSearch = async (text: string) => {
    setSearchValue(text);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (text.length < 3) {
      setFilteredTests(initialTests);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const results = await searchTestsByName(text);
        setFilteredTests(results ?? []);
      } catch (err) {
        setError(err.message || 'Search failed');
        setFilteredTests([]);
      } finally {
        setSearchLoading(false);
      }
    }, 500);
  };

  const showInitialTests = filteredTests === null || searchValue.length < 3;
  const testsToShow = showInitialTests ? initialTests : filteredTests || [];

  const applyFilters = useCallback(async () => {
    try {
      await loadTests();
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  }, [loadTests]);

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadTests} />
      }>
      <View style={styles.filtrationContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="search"
            placeholderTextColor={ColorVariants.darkGray.light}
            value={searchValue}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Icon
            name="sort-variant"
            size={36}
            color={
              filtersUsing
                ? ColorVariants.purple.default
                : ColorVariants.gray.dark
            }
          />
        </TouchableOpacity>
      </View>

      {searchLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (!showInitialTests && testsToShow.length === 0) || !testsToShow ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nothing found</Text>
        </View>
      ) : (
        testsToShow?.map(test => <TestCard key={test.id} test={test} />)
      )}

      <FiltrationWindow
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={applyFilters}
        currentSort={sortOption}
        onFiltersChanged={handleFiltersChanged}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtrationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 40,
    marginBottom: 10,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderRadius: ApplicationBorderRadius.default,
    fontSize: 20,
    backgroundColor: ColorVariants.gray.light,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: ColorVariants.darkGray.light,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
});
