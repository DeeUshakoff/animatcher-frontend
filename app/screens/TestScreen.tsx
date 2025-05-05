import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/types';
import {useTestProgress} from '@/hooks/useTestProgress';
import Button from '@components/Button.tsx';
import {TextStyles} from '@theme/fonts.ts';
import {HeaderRightComponent} from '@components/Test/HeaderRight.tsx';
import {useTestResult} from '@/hooks/useTestResult.ts';

type Route = RouteProp<RootStackParamList, 'Test'>;

export const TestScreen = () => {
  const {params} = useRoute<Route>();
  const test = params?.test;
  const {progress} = useTestProgress(test.id);
  const {getResult} = useTestResult();

  const result = getResult(test?.id);
  console.log(result, test?.id);
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('TestPass', {test: test});
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: test.title,
      headerRight: () => <HeaderRightComponent test={test} />,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={TextStyles.default.default}>
          {params.test.description}
        </Text>
      </View>
      {progress ? (
        result ? (
          <View style={styles.bottomContainer}>
            <View>
              <Text style={TextStyles.default.default}>You are</Text>
              <Text style={TextStyles.headline.large}>{result?.name}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonWrapper}>
                <Button variant={'grey'} onPress={handleStart}>
                  again
                </Button>
              </View>
              <View style={styles.buttonWrapper}>
                <Button>share</Button>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button onPress={handleStart}>Продолжить</Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                onPress={() =>
                  navigation.navigate('TestPass', {
                    test: params.test,
                    reset: true,
                  })
                }>
                again
              </Button>
            </View>
          </View>
        )
      ) : (
        <Button onPress={handleStart}>start</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    gap: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
  },
});
