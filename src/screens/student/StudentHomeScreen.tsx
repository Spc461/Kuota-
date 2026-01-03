import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../../components/common';
import { lightColors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import i18n from '../../i18n';

interface Navigation {
  navigate: (screen: string) => void;
}

interface StudentHomeScreenProps {
  navigation: Navigation;
}

const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({
  navigation,
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{i18n.t('common.welcome')}</Text>
        <Text style={styles.title}>Student Dashboard</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {i18n.t('student.upcomingSessions')}
        </Text>
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>No upcoming sessions</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {i18n.t('navigation.teachers')}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TeacherBrowse')}
          >
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>Browse teachers to get started</Text>
        </Card>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={styles.actionText}>
              {i18n.t('student.findTeacher')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionText}>
              {i18n.t('navigation.library')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={styles.actionText}>
              {i18n.t('student.studyPlanner')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🎓</Text>
            <Text style={styles.actionText}>
              {i18n.t('student.mySubscriptions')}
            </Text>
          </TouchableOpacity>
        </View>
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
  section: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: lightColors.text,
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.primary,
    fontWeight: typography.fontWeights.medium,
  },
  emptyCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.fontSizes.base,
    color: lightColors.textSecondary,
  },
  quickActions: {
    padding: spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    width: '47%',
    backgroundColor: lightColors.surface,
    padding: spacing.lg,
    borderRadius: spacing.md,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  actionText: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.text,
    fontWeight: typography.fontWeights.medium,
    textAlign: 'center',
  },
});

export default StudentHomeScreen;
