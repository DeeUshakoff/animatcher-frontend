import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import ModalWindow from './ModalWindow';
import { ColorVariants } from '@/theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import SelectTagWindow from './SelectTagWindow';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FiltrationWindowProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  currentSort: string
  onFiltersChanged?: () => void;
}

const FiltrationWindow = ({ visible, onClose, onApply, currentSort, onFiltersChanged }: FiltrationWindowProps) => {
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [rating, setRating] = useState(0);
  const [direction, setDirection] = useState<'asc' | 'desc'>(null);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showTagFilters, setShowTagFilters] = useState(false);

  const [hasFranchiseTags, setHasFranchiseTags] = useState(false);
  const [hasTags, setHasTags] = useState(false);
  const [chosenTag, setChosenTag] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  const checkActiveFilters = async () => {
    try {
      const [
        savedDirection, 
        franchiseTags, 
        regularTags
      ] = await Promise.all([
        AsyncStorage.getItem('sortDirection'),
        AsyncStorage.getItem('franchises'),
        AsyncStorage.getItem('tags')
      ]);

      const hasRatingFilter = rating > 0;
      const hasDirectionFilter = savedDirection !== null;
      const hasFranchiseFilter = !!franchiseTags && JSON.parse(franchiseTags).length > 0;
      const hasTagsFilter = !!regularTags && JSON.parse(regularTags).length > 0;

      setHasActiveFilters(
        hasRatingFilter || 
        hasDirectionFilter || 
        hasFranchiseFilter || 
        hasTagsFilter ||
        selectedSort !== 'rating'
      );
    } catch (error) {
      console.error('Error checking active filters:', error);
    }
  };

  const checkSavedTags = async () => {
    try {
      const savedDirection = await AsyncStorage.getItem('sortDirection');
      if (savedDirection) {
        setDirection(savedDirection as 'asc' | 'desc');
      }
      const [franchiseTags, regularTags] = await Promise.all([
        AsyncStorage.getItem('franchises'),
        AsyncStorage.getItem('tags')
      ]);

      const hasFranchises = franchiseTags ? JSON.parse(franchiseTags).length > 0 : false;
      const hasTags = regularTags ? JSON.parse(regularTags).length > 0 : false;

      setHasFranchiseTags(hasFranchises);
      setHasTags(hasTags);
      setChosenTag(hasTags);
    } catch (error) {
      console.error('Error checking saved tags:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      checkSavedTags();
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      checkActiveFilters();
    }
  }, [rating, direction, selectedSort, hasFranchiseTags, hasTags, visible]);

  const resetTags = async (tagType: string) => {
    try {
      await AsyncStorage.removeItem(tagType);
      if (tagType === 'franchises') {
        setHasFranchiseTags(false);
      } else {
        setHasTags(false);
        setChosenTag(false);
      }
      checkActiveFilters();
    } catch (error) {
      console.error('Error resetting tags:', error);
    }
  };

  const selectTag = (tagName: string) => {
    setSelectedTag(tagName);
    setShowTagFilters(true);
    if (tagName === 'franchises') {
      setHasFranchiseTags(true);
    } else {
      setChosenTag(true);
    }
  };

  const handleDirectionChange = (newDirection: 'asc' | 'desc') => {
    setDirection(newDirection);
  };

  const handleApply = async () => {
    try {
      if (direction) {
        await AsyncStorage.setItem('sortDirection', direction);
      }
      onFiltersChanged?.();
      onClose();
    } catch (error) {
      console.error('Error saving sort direction:', error);
    }
  };

  const resetAllFilters = async () => {
    try {
      setRating(0);
      setDirection(null);
      setSelectedSort('rating');
      setSelectedTag('');
      setHasFranchiseTags(false);
      setHasTags(false);
      setChosenTag(false);
      
      await Promise.all([
        AsyncStorage.removeItem('sortDirection'),
        AsyncStorage.removeItem('franchises'),
        AsyncStorage.removeItem('tags')
      ]);
      
    } catch (error) {
      console.error('Error resetting all filters:', error);
    }
  };

  // Обновляем рендеринг секций с тегами
  const renderTagSection = (tagType: 'franchises' | 'tags') => {
    const isFranchise = tagType === 'franchises';
    const hasActiveTags = isFranchise ? hasFranchiseTags : hasTags;
    
    return (
      <View style={[styles.option, {marginRight: -10}]}>
        <Text 
          style={[
            styles.optionText,
            hasActiveTags && { color: ColorVariants.purple.default }
          ]}
        >
          {isFranchise ? 'franchise' : 'tags'}
        </Text>

        <View style={styles.rowContainer}>
          {hasActiveTags && (
            <TouchableOpacity onPress={() => resetTags(tagType)}>
              <Text style={styles.resetFilters}>reset</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => selectTag(tagType)}>
            <Icon
              name="chevron-right"
              size={30}
              color={hasActiveTags ? ColorVariants.purple.default : ColorVariants.gray.dark}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ModalWindow visible={visible} onClose={onClose} onApply={handleApply}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>filters</Text>
          {hasActiveFilters && (
            <TouchableOpacity onPress={resetAllFilters}>
              <Text style={styles.resetFilters}>reset all</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>rating</Text>
          <View style={styles.rowContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Icon
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={24}
                  color={star <= rating ? ColorVariants.purple.default : ColorVariants.gray.dark}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.option}>
          <Text style={styles.optionText}>rating order</Text>
          
          <View style={styles.orderContainer}>
            <TouchableOpacity onPress={() => handleDirectionChange('asc')}>
              <Text style={[
                {fontSize: 20},
                direction === 'asc' ? {color: ColorVariants.purple.default} : {color: 'black'}
              ]}>
                asc
              </Text>
            </TouchableOpacity>
      
            <TouchableOpacity onPress={() => handleDirectionChange('desc')}>
              <Text style={[
                {fontSize: 20},
                direction === 'desc' ? {color: ColorVariants.purple.default} : {color: 'black'}
              ]}>
                desc
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {renderTagSection('franchises')}
        {renderTagSection('tags')}

        <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button variant="grey" onPress={onClose}>cancel</Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button variant="purple" onPress={handleApply}>apply</Button>
            </View>
        </View>
      </View>

      <SelectTagWindow
        visible={showTagFilters}
        onClose={() => {
          setShowTagFilters(false);
          checkSavedTags();
        }}
        tagName={selectedTag}
        onTagsChanged={() => {
          onFiltersChanged?.();
          checkSavedTags();
        }}
      />
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
    justifyContent: 'space-between'
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
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 20,
    gap: 10
  },
  buttonWrapper: {
    flex: 1
  },
});

export default FiltrationWindow;
function setChosenTag(arg0: boolean) {
  throw new Error('Function not implemented.');
}

