import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFavourites = () => {
  const [favourites, setFavourites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavourites = async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem('favouriteTests');
      setFavourites(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error('Failed to load favourites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavourite = async (test: any) => {
    try {
      const updatedFavourites = favourites.some((t) => t.id === test.id)
        ? favourites.filter((t) => t.id !== test.id)
        : [...favourites, test];

      await AsyncStorage.setItem('favouriteTests', JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
      return true;
    } catch (error) {
      console.error('Failed to update favourites:', error);
      return false;
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  return { favourites, isLoading, toggleFavourite, loadFavourites };
};

export default useFavourites;