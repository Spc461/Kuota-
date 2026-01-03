import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherDashboardScreen from '../screens/teacher/TeacherDashboardScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import { lightColors } from '../theme/colors';
import i18n from '../i18n';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>{title}</Text>
  </View>
);

export type TeacherTabParamList = {
  Dashboard: undefined;
  Sessions: undefined;
  Students: undefined;
  Materials: undefined;
  Announcements: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TeacherTabParamList>();

const TeacherNavigator: React.FC = () => {
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
        name="Dashboard"
        component={TeacherDashboardScreen}
        options={{
          tabBarLabel: i18n.t('navigation.dashboard'),
          headerTitle: i18n.t('navigation.dashboard'),
          tabBarIcon: () => '📊',
        }}
      />
      <Tab.Screen
        name="Sessions"
        options={{
          tabBarLabel: i18n.t('navigation.sessions'),
          headerTitle: i18n.t('navigation.sessions'),
          tabBarIcon: () => '🎥',
        }}
      >
        {() => <PlaceholderScreen title="Sessions" />}
      </Tab.Screen>
      <Tab.Screen
        name="Students"
        options={{
          tabBarLabel: i18n.t('navigation.students'),
          headerTitle: i18n.t('navigation.students'),
          tabBarIcon: () => '🎓',
        }}
      >
        {() => <PlaceholderScreen title="Students" />}
      </Tab.Screen>
      <Tab.Screen
        name="Materials"
        options={{
          tabBarLabel: i18n.t('navigation.materials'),
          headerTitle: i18n.t('navigation.materials'),
          tabBarIcon: () => '📁',
        }}
      >
        {() => <PlaceholderScreen title="Materials" />}
      </Tab.Screen>
      <Tab.Screen
        name="Announcements"
        options={{
          tabBarLabel: i18n.t('navigation.announcements'),
          headerTitle: i18n.t('navigation.announcements'),
          tabBarIcon: () => '📢',
        }}
      >
        {() => <PlaceholderScreen title="Announcements" />}
      </Tab.Screen>
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

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.background,
  },
  placeholderText: {
    fontSize: 18,
    color: lightColors.textSecondary,
  },
});

export default TeacherNavigator;
