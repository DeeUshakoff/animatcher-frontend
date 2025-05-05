import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import TestCard from '@/components/TestCard';
import { useIsFocused } from '@react-navigation/native';
import useFavourites from '@/hooks/useFavourites';

export const FavouritesScreen = () => {
  const { favourites, isLoading, error, toggleFavourite, loadFavourites } = useFavourites();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadFavourites();
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favourite tests yet</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TestCard
              key={item.id}
              id={item.id}
              label={item.title}
              description={item.description}
              isLiked={true}
              onToggleFavourite={() => toggleFavourite(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FavouritesScreen;