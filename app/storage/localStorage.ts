import { MMKV } from 'react-native-mmkv';
import {TestProgress, TestResult} from '@/models/TestModel';

const storage = new MMKV();

const STORAGE_KEYS = {
    COMPLETED: 'completed_tests',
    PROGRESS: 'test_progress',
    FAVORITES: 'favorites',
};

export const saveTestResult = (result: TestResult) => {
    const data = getCompletedTests();
    data[result.testId] = result;
    storage.set(STORAGE_KEYS.COMPLETED, JSON.stringify(data));
};

export const getCompletedTests = (): Record<string, TestResult> => {
    const raw = storage.getString(STORAGE_KEYS.COMPLETED);
    return raw ? JSON.parse(raw) : {};
};

export const getTestResult = (testId: string): TestResult | null => {
    const all = getCompletedTests();
    return all[testId] || null;
};

export const saveProgress = (progress: TestProgress) => {
    const data = getTestProgressMap();
    data[progress.testId] = progress;
    storage.set(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
};

export const getTestProgressMap = (): Record<string, TestProgress> => {
    const raw = storage.getString(STORAGE_KEYS.PROGRESS);
    return raw ? JSON.parse(raw) : {};
};

export const getTestProgress = (testId: string): TestProgress | null => {
    const all = getTestProgressMap();
    return all[testId] || null;
};

export const clearTestProgress = (testId: string) => {
    const all = getTestProgressMap();
    delete all[testId];
    storage.set(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
};

export const addToFavorites = (testId: string) => {
    const current = getFavorites();
    if (!current.includes(testId)) {
        current.push(testId);
        storage.set(STORAGE_KEYS.FAVORITES, JSON.stringify(current));
    }
};

export const removeFromFavorites = (testId: string) => {
    const current = getFavorites().filter(id => id !== testId);
    storage.set(STORAGE_KEYS.FAVORITES, JSON.stringify(current));
};

export const getFavorites = (): string[] => {
    const raw = storage.getString(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
};

export const isFavorite = (testId: string): boolean => {
    return getFavorites().includes(testId);
};
