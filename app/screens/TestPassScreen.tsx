import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useTestProgress} from '@/hooks/useTestProgress';
import Button from '@components/Button.tsx';
import {SelectableItem} from '@components/SelectableItem.tsx';
import {TextStyles} from '@theme/fonts.ts';

export const TestPassScreen = () => {
  const {params} = useRoute<any>();
  const {test, reset} = params;
  const navigation = useNavigation();
  const {progress, updateProgress, resetProgress} = useTestProgress(test.id);

  useEffect(() => {
    if (reset) {
      resetProgress();
    }
  }, [reset]);

  const currentIndex = progress?.currentQuestionIndex || 0;
  const selectedOptions = progress?.selectedOptions || [];

  const question = test.questions[currentIndex];

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
          <Button onPress={goNext}>next</Button>
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
    flexDirection: 'column',
    gap: 10,
  },
  bottomContainer: {
    gap: 50,
  },
  optionItemContainer: {
    marginBottom: 10,
  },
});
