import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/common';
import { lightColors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import i18n from '../../i18n';

const TeacherDashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{i18n.t('common.welcome')}</Text>
        <Text style={styles.title}>Teacher Dashboard</Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>{i18n.t('teacher.myStudents')}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>
            {i18n.t('teacher.totalSessions')}
          </Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>0 DA</Text>
          <Text style={styles.statLabel}>{i18n.t('teacher.earnings')}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>0.0</Text>
          <Text style={styles.statLabel}>{i18n.t('teacher.rating')}</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {i18n.t('teacher.activeSessions')}
        </Text>
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No active sessions</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No recent activity</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: lightColors.primary,
  },
  greeting: {
    fontSize: typography.fontSizes.base,
    color: lightColors.background,
    opacity: 0.9,
  },
  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: lightColors.background,
    marginTop: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    width: '47%',
    alignItems: 'center',
    padding: spacing.lg,
  },
  statValue: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: lightColors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.textSecondary,
    textAlign: 'center',
  },
  section: {
    padding: spacing.lg,
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

export default TeacherDashboardScreen;
