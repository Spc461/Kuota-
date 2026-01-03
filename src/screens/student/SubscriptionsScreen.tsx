import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/common';
import { lightColors } from '../../theme/colors';
import { spacing, typography } from '../../theme';

const SubscriptionsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.emptyCard}>
        <Text style={styles.emptyText}>No subscriptions yet</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    padding: spacing.lg,
  },
  emptyCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.fontSizes.base,
    color: lightColors.textSecondary,
  },
});

export default SubscriptionsScreen;
