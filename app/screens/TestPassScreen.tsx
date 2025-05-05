import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useTestProgress} from '@/hooks/useTestProgress';
import Button from '@components/Button.tsx';
import {SelectableItem} from '@components/SelectableItem.tsx';
import {TextStyles} from '@theme/fonts.ts';
import {HeaderRightComponent} from '@components/Test/HeaderRight.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/types.ts';

export const TestPassScreen = () => {
  const {params} = useRoute<any>();
  const {test, reset} = params;
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Tabs'>>();
  const {progress, updateProgress} = useTestProgress(test.id);

  const currentIndex = progress ? progress.currentQuestionIndex : 0;
  const selectedOptions = progress?.selectedOptions || [];
  const question = test.questions[currentIndex];
  const updateHeader = (progressIndex: number) => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={TextStyles.headline.default}>{test.title}</Text>
      ),
      headerRight: () => (
        <HeaderRightComponent
          test={test}
          progress={progressIndex}
          questionsLength={test.questions.length}
          isPassing
        />
      ),
    });
  };
  useEffect(() => {
    updateHeader(currentIndex + 1);
  }, [navigation, reset]);

  const handleSelect = (optionId: string) => {
    const updated = [...selectedOptions];
    updated[currentIndex] = optionId;
    updateProgress({
      currentQuestionIndex: currentIndex,
      selectedOptions: updated,
    });
  };

  const goNext = () => {
    if (currentIndex + 1 < test.questions.length) {
      updateProgress({currentQuestionIndex: currentIndex + 1});
      updateHeader(currentIndex + 1 === 1 ? 2 : currentIndex + 2);
    } else {
      navigation.replace('TestResult', {
        testId: test.id,
        selectedOptions,
      });
    }
  };
  const goBack = () => {
    if (currentIndex - 1 >= 0) {
      updateProgress({currentQuestionIndex: currentIndex - 1});

      const getShownIndex = () => {
        if (currentIndex - 1 === 1) {
          return 2;
        }
        if (currentIndex - 2 <= 0) {
          return 1;
        }
        return currentIndex - 2;
      };

      updateHeader(getShownIndex());
    } else {
      navigation.navigate('TestResult', {
        testId: test.id,
        selectedOptions,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={TextStyles.default.default}>{question.text}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <FlatList
          style={styles.optionsContainer}
          data={question.options}
          renderItem={({item}) => (
            <View style={styles.optionItemContainer}>
              <SelectableItem
                key={item.id}
                onPress={() => handleSelect(item.id)}
                selected={selectedOptions[currentIndex] === item.id}>
                {item.text}
              </SelectableItem>
            </View>
          )}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              inactive={currentIndex === 0}
              variant={'grey'}
              onPress={goBack}>
              back
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              inactive={selectedOptions[currentIndex] == null}
              onPress={goNext}>
              next
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'space-between',
    paddingBottom: 50,
    gap: 15,
  },
  optionsContainer: {
    gap: 5,
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  bottomContainer: {
    gap: 50,
  },
  optionItemContainer: {
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
});
