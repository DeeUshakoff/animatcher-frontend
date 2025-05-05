import {Alert} from 'react-native';
import {API_BASE_URL} from '@/consts';

export const fetchTests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tests`, {
      headers: {
        Accept: 'application/json',
      },
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

export const passTest = async (testId: string, selectedOptions: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tests/pass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        testId: testId,
        selectedOptions: selectedOptions,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    Alert.alert('Error', 'Failed to pass test');
    throw error;
  }
};
