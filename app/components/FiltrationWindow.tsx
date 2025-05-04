import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ModalWindow from './ModalWindow';
import { ColorVariants } from '@/theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import SelectTagWindow from './SelectTagWindow';

interface FiltrationWindowProps {
  visible: boolean;
  onClose: () => void;
  onApply: (sortBy: 'rating' | 'title' | 'date') => void;
  currentSort: 'rating' | 'title' | 'date';
}

const FiltrationWindow = ({ visible, onClose, onApply, currentSort }: FiltrationWindowProps) => {
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [rating, setRating] = useState(0);
  const [direction, setDirection] = useState<'asc' | 'desc'>(null);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showTagFilters, setShowTagFilters] = useState(false);

  const handleDirectionChange = (newDirection: 'asc' | 'desc') => {
    setDirection(newDirection);
  };

  const selectTag = (tagName: string) => {
    setSelectedTag(tagName);
    setShowTagFilters(true);
  }

  const handleApply = () => {
    onApply(selectedSort);
  };

  const handleReset = () => {
    setRating(0);
    setDirection('asc');
    setSelectedSort('rating');
    setSelectedTag('');
  };

  return (
    <ModalWindow visible={visible} onClose={onClose} onApply={handleApply}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>filters</Text>
          <Text style={styles.resetFilters}>reset all</Text>
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>rating</Text>
          <View style={styles.starsContainer}>
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
        
        <View style={[styles.option, {marginRight: -10}]}>
          <Text style={styles.optionText}>franchise</Text>
          <TouchableOpacity onPress={() => selectTag('franchise')}>
            <Icon
              name="chevron-right"
              size={30}
              color={ColorVariants.gray.dark}
            />
          </TouchableOpacity>
          
        </View>
        
        <View style={[styles.option, {marginRight: -10}]}>
          <Text style={styles.optionText}>tags</Text>
          <TouchableOpacity onPress={() => selectTag('tags')}>
            <Icon
              name="chevron-right"
              size={30}
              color={ColorVariants.gray.dark}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button variant="grey">cancel</Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button variant="purple" light>apply</Button>
            </View>
        </View>
      </View>

      <SelectTagWindow
        visible={showTagFilters}
        onClose={() => setShowTagFilters(false)}
        tagName={selectedTag}
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
  starsContainer: {
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
