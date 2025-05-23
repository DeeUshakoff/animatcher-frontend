import {ApplicationBorderRadius, ColorVariants} from '@/theme/colors';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/types.ts';
import {Test} from '@/models/TestModel.ts';
import {useFavorites} from '@/hooks/useFavorites.ts';
import {useTestProgress} from '@/hooks/useTestProgress.ts';
import {useTestResult} from '@/hooks/useTestResult.ts';
import {TextStyles} from '@theme/fonts.ts';

type TestCardProps = {
  test: Test;
};

const TestCard: React.FC<TestCardProps> = ({test}) => {
  const {isFavorite, addToFavorites, removeFromFavorites} = useFavorites();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Tabs'>>();
  const {progress, resetProgress} = useTestProgress(test.id);
  const {getResult, deleteResult} = useTestResult();
  const [liked, setLiked] = useState<boolean>(isFavorite(test.id));

  const testResult = getResult(test.id);
  const handleResultPress = () => {
    if (testResult) {
      navigation.push('TestResult', {
        testId: test.id,
        selectedOptions: testResult.selectedOptions,
      });
    }
  };

  const handleAgainPress = () => {
    resetProgress();
    deleteResult(test.id);
    navigation.navigate('TestPass', {test: test});
  };

  const handlePress = () => {
    navigation.navigate('Test', {test: test});
  };

  const handleLikePress = () => {
    setLiked(!isFavorite(test.id));
    if (isFavorite(test.id)) {
      removeFromFavorites(test.id);
    } else {
      addToFavorites(test.id);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        <View style={styles.cardInfo}>
          <Text
            style={[
              TextStyles.headline.medium,
              {color: ColorVariants.darkGray.default},
            ]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {test.title}
          </Text>
          <Text
            style={[
              TextStyles.default.default,
              {color: ColorVariants.darkGray.default},
            ]}
            numberOfLines={3}
            ellipsizeMode="tail">
            {test.description}
          </Text>
        </View>

        <TouchableOpacity onPress={handleLikePress}>
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={
              liked ? ColorVariants.purple.default : ColorVariants.gray.dark
            }
          />
        </TouchableOpacity>
      </View>

      {progress ? (
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonWrapper}>
            <Button onPress={handleAgainPress} variant="grey">
              again
            </Button>
          </View>
          {testResult ? (
            <View style={styles.buttonWrapper}>
              <Button onPress={handleResultPress} variant="grey">
                result
              </Button>
            </View>
          ) : (
            <View style={styles.buttonWrapper}>
              <Button variant="grey">continue</Button>
            </View>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorVariants.gray.light,
    padding: 15,
    borderRadius: ApplicationBorderRadius.default,
    alignItems: 'flex-start',
    margin: 10,
    alignSelf: 'center',
    width: '100%',
  },
  cardInfo: {
    flex: 1,
    marginRight: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  likeButton: {
    padding: 8,
  },
  likeIcon: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default TestCard;
