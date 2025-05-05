import {useCallback, useEffect, useState} from 'react';
import {useMMKVObject} from 'react-native-mmkv';
import {Test} from '@/models/TestModel';

const FAVORITES_KEY = 'favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useMMKVObject<string[]>(FAVORITES_KEY);
  const [local, setLocal] = useState<string[]>(favorites ?? []);

  useEffect(() => {
    if (favorites) {
      setLocal(favorites);
    }
  }, [favorites]);

  const addToFavorites = useCallback(
    (testId: string) => {
      const updated = Array.from(new Set([...(favorites ?? []), testId]));
      setFavorites(updated);
    },
    [favorites, setFavorites],
  );

  const removeFromFavorites = useCallback(
    (testId: string) => {
      const updated = (favorites ?? []).filter(id => id !== testId);
      setFavorites(updated);
    },
    [favorites, setFavorites],
  );

  const isFavorite = useCallback(
    (testId: string) => {
      return (favorites ?? []).includes(testId);
    },
    [favorites],
  );

  return {
    favorites: local,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };
};
