import { Alert } from 'react-native';
import { API_BASE_URL } from '@/consts';

export const fetchTests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tests`, {
        headers: {
          'Accept': 'application/json',
        }
      });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    Alert.alert('Error', 'Failed to fetch tests');
    throw error;
  }
};

export const searchTestsByName = async (name: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tests?name=${name}`, {
        headers: {
          'Accept': 'application/json',
        }
      });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    Alert.alert('Error', 'Failed to search tests');
    throw error;
  }
};
