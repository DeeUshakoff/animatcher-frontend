import {ApplicationBorderRadius, ColorVariants} from '@/theme/colors';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/types.ts';
import {Test} from '@/models/TestModel.ts';
import {getTestProgress, getTestResult} from '@/storage/localStorage.ts';
import {useFavorites} from '@/hooks/useFavorites.ts';

type TestCardProps = {
  test: Test;
};

const TestCard: React.FC<TestCardProps> = ({test}) => {
  const {isFavorite, addToFavorites, removeFromFavorites} = useFavorites();

  const [liked, setLiked] = useState<boolean>(isFavorite(test.id));
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Tabs'>>();

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

  const testProgress = getTestProgress(test.id);
  const testResult = getTestResult(test.id);

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
          <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
            {test.title}
          </Text>
          <Text
            style={styles.description}
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
              liked ? ColorVariants.purple.default : ColorVariants.gray.default
            }
          />
        </TouchableOpacity>
      </View>

      {testProgress ? (
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonWrapper}>
            <Button variant="grey">again</Button>
          </View>
          {testResult ? (
            <View style={styles.buttonWrapper}>
              <Button variant="grey">result</Button>
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
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: ApplicationBorderRadius.default,
    alignItems: 'flex-start',
    margin: 10,
    alignSelf: 'center',
    height: '300px',
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
  label: {
    fontSize: 20,
    fontWeight: 500,
    color: '#000',
    overflow: 'hidden',
  },
  description: {
    fontSize: 20,
    marginTop: 5,
    color: '#000',
    overflow: 'hidden',
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
  button: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
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
