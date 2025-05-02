import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '@screens/HomeScreen';
import {FavouritesScreen} from '@screens/FavouritesScreen';
import {HistoryScreen} from '@screens/HistoryScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PURPLE, TEXT, BORDER_RADIUS} from '@theme/colors';
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
          tabBarActiveTintColor: PURPLE,
          tabBarInactiveTintColor: TEXT.default,
          tabBarStyle: [
            styles.tabBarStyleBase,
            {
              height: 60 + insets.bottom,
            },
          ],
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

const styles = StyleSheet.create({
  tabBarStyleBase: {
    backgroundColor: 'white',
    borderTopWidth: 0,
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
