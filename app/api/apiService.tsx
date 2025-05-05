import { Alert } from 'react-native';
import { API_BASE_URL } from '@/consts';

export const fetchTests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tests`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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

export const searchTags = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tags`, {
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

export const searchFranchises = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/franchises`, {
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

export const getTestsWithFilters = async (franchises?: string | null, tags?: string | null, sortDirection?: string | null) => {
  try {
    const params = new URLSearchParams();
    
    if (franchises) {
      const franchiseList = JSON.parse(franchises);
      if (franchiseList.length > 0) {
        params.append('franchise', franchiseList[0]);
      }
    }
    
    if (tags) {
      const tagsList = JSON.parse(tags);
      tagsList.forEach((tag: string) => params.append('tags', tag));
    }
    
    if (sortDirection) {
      params.append('orderBy', sortDirection === 'desc' ? 'ratingDesc' : 'rating');
    }

    const response = await fetch(`${API_BASE_URL}/tests?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching filtered tests:', error);
    throw error;
  }
};