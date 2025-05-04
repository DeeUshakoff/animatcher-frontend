import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ModalWindow from './ModalWindow';
import { ColorVariants } from '@/theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';

interface SelectionTagWindowProps {
  visible: boolean;
  tagName: string;
  onClose: () => void;
}

const SelectTagWindow = ({ visible, tagName, onClose }: SelectionTagWindowProps) => {


  const handleDirectionChange = (newDirection: 'asc' | 'desc') => {
    setDirection(newDirection);
  };

  const handleApply = () => {
    onApply(selectedSort);
  };

  return (
    <ModalWindow visible={visible} onClose={onClose} onApply={handleApply}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={onClose}>
              <Icon
                name="chevron-left"
                size={36}
                color={ColorVariants.darkGray.dark}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{tagName}</Text>
          </View>
          
          <Text style={styles.resetFilters}>reset all</Text>
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
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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

export default SelectTagWindow;
