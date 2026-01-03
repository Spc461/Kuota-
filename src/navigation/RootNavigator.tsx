import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AuthNavigator from './AuthNavigator';
import StudentNavigator from './StudentNavigator';
import TeacherNavigator from './TeacherNavigator';

const RootNavigator: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const getNavigator = () => {
    if (!isAuthenticated) {
      return <AuthNavigator />;
    }

    if (user?.role === 'teacher') {
      return <TeacherNavigator />;
    }

    return <StudentNavigator />;
  };

  return <NavigationContainer>{getNavigator()}</NavigationContainer>;
};

export default RootNavigator;
