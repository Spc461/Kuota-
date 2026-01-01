import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { lightColors } from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({ children, style, elevated = true }) => {
  return (
    <View style={[styles.card, elevated && shadows.md, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightColors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
});

export default Card;
