import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../components/common';
import { lightColors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import i18n from '../../i18n';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RoleSelectionScreenProps {}

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = () => {
  const handleRoleSelection = (_role: 'student' | 'teacher') => {
    // TODO: Implement role selection logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('auth.selectRole')}</Text>
        <Text style={styles.subtitle}>Choose how you want to use Kuota</Text>
      </View>

      <View style={styles.rolesContainer}>
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelection('student')}
        >
          <Card style={styles.cardContent}>
            <Text style={styles.roleIcon}>🎓</Text>
            <Text style={styles.roleTitle}>{i18n.t('auth.student')}</Text>
            <Text style={styles.roleDescription}>
              Find teachers, join sessions, and learn
            </Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelection('teacher')}
        >
          <Card style={styles.cardContent}>
            <Text style={styles.roleIcon}>👨‍🏫</Text>
            <Text style={styles.roleTitle}>{i18n.t('auth.teacher')}</Text>
            <Text style={styles.roleDescription}>
              Create sessions, teach students, and earn
            </Text>
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing['4xl'],
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    color: lightColors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSizes.lg,
    color: lightColors.textSecondary,
    textAlign: 'center',
  },
  rolesContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  roleCard: {
    flex: 1,
  },
  cardContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: lightColors.border,
  },
  roleIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  roleTitle: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: lightColors.text,
    marginBottom: spacing.sm,
  },
  roleDescription: {
    fontSize: typography.fontSizes.base,
    color: lightColors.textSecondary,
    textAlign: 'center',
  },
});

export default RoleSelectionScreen;
