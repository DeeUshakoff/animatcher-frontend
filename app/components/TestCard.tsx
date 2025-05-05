import { ColorVariants } from '@/theme/colors';
import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity, 
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';

type TestCardProps = {
  id: string;
  label: string;
  description: string;
  isLiked: boolean;
  onToggleFavourite: () => void;
};

const TestCard: React.FC<TestCardProps> = ({ 
  id, 
  label, 
  description, 
  isLiked, 
  onToggleFavourite 
}) => {
  return (
    <View style={styles.card}>
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <View style={styles.cardInfo}>
          <Text 
            style={styles.label}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
          <Text 
            style={styles.description}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        </View>

        <TouchableOpacity onPress={onToggleFavourite}>
          <Icon
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? ColorVariants.purple.default : ColorVariants.darkGray.light}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button variant="grey">again</Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button variant="grey">result</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
    margin: 10,
    alignSelf: 'center',
    height: '300px',
    width: '100%',
  },
  cardInfo: {
    flex: 1,
    marginRight: 10
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
    overflow: 'hidden'
  },
  description: {
    fontSize: 20,
    marginTop: 5,
    color: '#000',
    overflow: 'hidden'
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
    flex: 1
  },
});

export default TestCard;