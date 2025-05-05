import {Test} from '@/models/TestModel.ts';
import {useFavorites} from '@/hooks/useFavorites.ts';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorVariants} from '@theme/colors.ts';
import {TextStyles} from '@theme/fonts.ts';

interface HeaderRightProps {
  test: Test;
  isPassing?: boolean;
  progress?: number;
  questionsLength?: number;
}

export const HeaderRightComponent: React.FC<HeaderRightProps> = ({
  test,
  progress,
  isPassing = false,
  questionsLength,
}) => {
  const {isFavorite, addToFavorites, removeFromFavorites} = useFavorites();
  const [liked, setLiked] = useState<boolean>(isFavorite(test.id));
  const handleLikePress = () => {
    setLiked(!isFavorite(test.id));
    if (isFavorite(test.id)) {
      removeFromFavorites(test.id);
    } else {
      addToFavorites(test.id);
    }
  };
  return (
    <View style={styles.headerRightContainer}>
      <Text style={TextStyles.headline.default}>
        {isPassing ? `${progress} / ${questionsLength}` : null}
      </Text>
      <TouchableOpacity onPress={handleLikePress}>
        <Icon
          name={liked ? 'heart' : 'heart-outline'}
          size={24}
          color={
            liked
              ? ColorVariants.purple.default
              : ColorVariants.darkGray.default
          }
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name={'share-outline'}
          size={24}
          color={ColorVariants.darkGray.default}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});
