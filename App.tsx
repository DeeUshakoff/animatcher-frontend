import React from 'react';
import {TabNavigator} from '@/navigation/TabNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'default'}
      />

      <SafeAreaView style={styles.safeAreaStyle}>
        <TabNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
});

export default App;
