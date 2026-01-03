import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/common';
import { lightColors } from '../../theme/colors';
import { spacing, typography } from '../../theme';
import i18n from '../../i18n';

const SessionsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {i18n.t('student.upcomingSessions')}
        </Text>
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No upcoming sessions</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Sessions</Text>
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No past sessions</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: lightColors.text,
    marginBottom: spacing.md,
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

export default SessionsScreen;
