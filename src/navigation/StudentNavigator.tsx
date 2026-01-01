import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import TeacherBrowseScreen from '../screens/student/TeacherBrowseScreen';
import SubscriptionsScreen from '../screens/student/SubscriptionsScreen';
import SessionsScreen from '../screens/student/SessionsScreen';
import LibraryScreen from '../screens/student/LibraryScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import { lightColors } from '../theme/colors';
import i18n from '../i18n';

export type StudentTabParamList = {
  Home: undefined;
  Teachers: undefined;
  Subscriptions: undefined;
  Sessions: undefined;
  Library: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<StudentTabParamList>();

const StudentNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: lightColors.primary,
        tabBarInactiveTintColor: lightColors.textSecondary,
        headerShown: true,
        headerStyle: {
          backgroundColor: lightColors.primary,
        },
        headerTintColor: lightColors.background,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StudentHomeScreen}
        options={{
          tabBarLabel: i18n.t('navigation.home'),
          headerTitle: i18n.t('common.appName'),
          tabBarIcon: () => '🏠',
        }}
      />
      <Tab.Screen
        name="Teachers"
        component={TeacherBrowseScreen}
        options={{
          tabBarLabel: i18n.t('navigation.teachers'),
          headerTitle: i18n.t('navigation.teachers'),
          tabBarIcon: () => '👨‍🏫',
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{
          tabBarLabel: i18n.t('navigation.subscriptions'),
          headerTitle: i18n.t('navigation.subscriptions'),
          tabBarIcon: () => '📋',
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionsScreen}
        options={{
          tabBarLabel: i18n.t('navigation.sessions'),
          headerTitle: i18n.t('navigation.sessions'),
          tabBarIcon: () => '🎥',
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: i18n.t('navigation.library'),
          headerTitle: i18n.t('navigation.library'),
          tabBarIcon: () => '📚',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: i18n.t('navigation.profile'),
          headerTitle: i18n.t('navigation.profile'),
          tabBarIcon: () => '👤',
        }}
      />
    </Tab.Navigator>
  );
};

export default StudentNavigator;
