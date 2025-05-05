import React from 'react';
import {TabNavigator} from '@/navigation/TabNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/types.ts';
import {NavigationContainer} from '@react-navigation/native';
import {TestScreen} from '@screens/TestScreen';
import {TestPassScreen} from '@screens/TestPassScreen';
import {TestResultScreen} from '@screens/TestResultScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            options={{headerShown: false}}
            component={TabNavigator}
          />
          <Stack.Screen
            name="Test"
            options={{headerShown: true}}
            component={TestScreen}
          />
          <Stack.Screen
            name="TestPass"
            options={{headerShown: true}}
            component={TestPassScreen}
          />
          <Stack.Screen
            name="TestResult"
            options={{headerShown: true}}
            component={TestResultScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
});

export default App;
