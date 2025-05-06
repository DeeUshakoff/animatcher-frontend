import React from 'react';
import {TabNavigator} from '@/navigation/TabNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/types.ts';
import {NavigationContainer} from '@react-navigation/native';
import {TestScreen} from '@screens/TestScreen';
import {TestPassScreen} from '@screens/TestPassScreen';
import {TestResultScreen} from '@screens/TestResultScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            options={{headerShown: false}}
            component={TabNavigator}
          />
          <Stack.Screen
            name="Test"
            options={{headerShown: true, headerShadowVisible: false}}
            component={TestScreen}
          />
          <Stack.Screen
            name="TestPass"
            options={{headerShown: true, headerShadowVisible: false}}
            component={TestPassScreen}
          />
          <Stack.Screen
            name="TestResult"
            options={{headerShown: true, headerShadowVisible: false}}
            component={TestResultScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
