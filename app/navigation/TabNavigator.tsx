import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '@screens/HomeScreen';
import {FavouritesScreen} from '@screens/FavouritesScreen';
import {HistoryScreen} from '@screens/HistoryScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorVariants} from '@theme/colors';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextStyles} from '@theme/fonts';

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
    <SafeAreaView style={styles.safeAreaStyle}>
      <Tab.Navigator
        safeAreaInsets={insets}
        screenOptions={({route}) => ({
          headerShadowVisible: false,
          headerTitleStyle: TextStyles.headline.medium,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name={TAB_ICONS[route.name]}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: ColorVariants.purple.default,
          tabBarInactiveTintColor: ColorVariants.darkGray.default,
          tabBarStyle: [
            styles.tabBarStyleBase,
            {
              height: 60 + insets.bottom,
            },
          ],
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarLabelStyle: [TextStyles.default.small, styles.tabBarLabelStyle],
        })}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name="favourite" component={FavouritesScreen} />
        <Tab.Screen name="history" component={HistoryScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
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
    margin: 5,
  },
  tabBarLabelStyle: {
    fontWeight: 'bold',
  },
});
