import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightColors } from '../../theme/colors';
import { spacing, typography } from '../../theme';

const TeacherBrowseScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teacher Browse Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  text: {
    fontSize: typography.fontSizes.lg,
    color: lightColors.text,
  },
});

export default TeacherBrowseScreen;
