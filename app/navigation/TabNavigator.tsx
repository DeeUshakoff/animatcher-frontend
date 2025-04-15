import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '@screens/HomeScreen.tsx';
import {FavouritesScreen} from '@screens/FavouritesScreen.tsx';
import {HistoryScreen} from '@screens/HistoryScreen.tsx';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PRIMARY, TEXT, BORDER_RADIUS} from '@theme/colors.ts';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TabParamList = {
  home: undefined;
  favourite: undefined;
  history: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<keyof TabParamList, string> = {
  home: 'home-outline',
  favourite: 'cards-heart-outline',
  history: 'history',
};

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      height: 60 + insets.bottom,
      paddingHorizontal: 0,
      marginHorizontal: 0,
      elevation: 0,
      shadowOpacity: 0,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    tabBarItemStyle: {
      borderRadius: BORDER_RADIUS.default,
      margin: 5,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        safeAreaInsets={insets}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name={TAB_ICONS[route.name]}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: PRIMARY.default,
          tabBarInactiveTintColor: TEXT.default,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        })}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name="favourite" component={FavouritesScreen} />
        <Tab.Screen name="history" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
