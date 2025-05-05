import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, FlatList, Alert } from 'react-native';
import ModalWindow from './ModalWindow';
import { ApplicationBorderRadius, ColorVariants } from '@/theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import { searchTags, searchFranchises } from '@/api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SelectionTagWindowProps {
  visible: boolean;
  tagName: string;
  onClose: () => void;
  onTagsChanged: () => void;
}

const SelectTagWindow = ({ visible, tagName, onClose }: SelectionTagWindowProps, onTagsChanged) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tags, setTags] = useState<object[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagApiMethods = {
    'franchises': searchFranchises,
    'tags': searchTags
  }

  const loadSavedTags = async () => {
    try {
      const savedTags = await AsyncStorage.getItem(tagName);
      if (savedTags) {
        const parsedTags = JSON.parse(savedTags);
        if (Array.isArray(parsedTags) && parsedTags.length > 0) {
          setSelectedTags(parsedTags);
        }
      }
    } catch (error) {
      console.error('Error loading saved tags:', error);
    }
  };

  const filteredTags = useMemo(() => {
    if (searchValue.length < 3) return tags;
    
    return tags.filter(tag => 
      (tag.tagName && tag.tagName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (tag.title && tag.title.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [tags, searchValue]);

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  const isSelectedTag = (item: object) => {
    const name = (item.title || item.tagName || '').trim();
    return selectedTags.some(tag => tag.trim() === name);
  };

  const handleTagPress = (tag: object) => {
    const name = tag.tagName || tag.title || '';
    setSelectedTags(prev => 
      prev.includes(name)
      ? prev.filter(tag => tag !== name)
      : [...prev, name]
    );
  };

  const handleApply = async () => {
    try {
      await AsyncStorage.setItem(tagName, JSON.stringify(selectedTags));
      onTagsChanged?.();
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save selected tags');
      console.error('Error saving tags:', error);
    }
  };

  const goBack = () => {
    setTags([]);
    onClose();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const apiMethod = tagApiMethods[tagName];

        if (!apiMethod) {
          throw new Error(`No API method defined for tag type: ${tagName}`);
        }

        // Параллельно загружаем данные и сохраненные теги
        const [data] = await Promise.all([
          apiMethod(),
          loadSavedTags()
        ]);

        setTags(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load tests');
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      loadData();
    } else {
      setSearchValue('');
      setSelectedTags([]);
    }
  }, [tagName, visible]); 

  return (
    <ModalWindow visible={visible} onClose={onClose} onApply={handleApply}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.rowTitleContainer}>
            <TouchableOpacity onPress={goBack}>
              <Icon
                name="chevron-left"
                size={36}
                color={ColorVariants.darkGray.dark}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{tagName}</Text>
          </View>
          {selectedTags && (
            <TouchableOpacity onPress={() => {setSelectedTags([]); onTagsChanged?.()}}>
              <Text style={styles.resetFilters}>reset all</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="search"
            placeholderTextColor={ColorVariants.darkGray.light}
            value={searchValue}
            onChangeText={handleSearch}
          />
        </View>

        <View style={styles.tagsContainer}>
          {loading ? (
            // добавьте лоадер со стилями, а то он где-то в чебоксарах
            <View> 
            </View>
          ) : (
            <FlatList
              data={filteredTags}
              extraData={selectedTags.length}
              style={styles.tagsContainer}
              contentContainerStyle={styles.listContent}
              keyExtractor={item => `${item.id || item.tagId}_${item.tagName || item.title}`}
              renderItem={({ item }) => (
                <Button onPress={() => handleTagPress(item)} variant={isSelectedTag(item) ? 'purple' : 'grey'}>
                    {item.tagName || item.title}
                </Button>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Nothing found</Text>
                </View>
              }
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonWrapper}>
            <Button variant="grey" onPress={() => goBack()}>cancel</Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button 
              variant="purple" 
              inactive={selectedTags.length ? false : true}
              onPress={() => handleApply()}
            >
              apply
            </Button>
          </View>
        </View>
      </View>
    </ModalWindow>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  titleContainer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetFilters: {
    fontSize: 20,
    fontWeight: 400,
    color: ColorVariants.purple.default,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: ColorVariants.darkGray.dark,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 20,
    color: ColorVariants.darkGray.default,
  },
  rowTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: -5, // костыльная история, чтоб не уезжало
    marginLeft: -15
  },
  orderContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ColorVariants.purple.default,
  },
  tagsContainer: {
    flex: 1,
    marginTop: 0,
  },
  listContent: {
    paddingBottom: 80,
    gap: 10
  },
  buttonsContainer: {
    paddingTop: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 10,
    backgroundColor: 'white',
  },
  buttonWrapper: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 20
  },
  input: {
    borderRadius: ApplicationBorderRadius.default,
    fontSize: 20,
    backgroundColor: ColorVariants.gray.light,
    textAlign: 'center',
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: ColorVariants.darkGray.light,
  },
});

export default SelectTagWindow;
