import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../common';
import { Session } from '../../types/models';
import { lightColors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatDate } from '../../utils/helpers';

interface SessionCardProps {
  session: Session;
  onPress: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onPress }) => {
  const getStatusColor = () => {
    switch (session.status) {
      case 'live':
        return lightColors.success;
      case 'scheduled':
        return lightColors.primary;
      case 'completed':
        return lightColors.textSecondary;
      case 'cancelled':
        return lightColors.error;
      default:
        return lightColors.textSecondary;
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{session.title}</Text>
          <View
            style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
          >
            <Text style={styles.statusText}>
              {session.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.teacher}>👨‍🏫 {session.teacherName}</Text>
        <Text style={styles.subject}>📚 {session.subject}</Text>

        <View style={styles.footer}>
          <Text style={styles.time}>
            🕐 {formatDate(session.startTime, 'PPp')}
          </Text>
          <Text style={styles.duration}>⏱️ {session.duration}min</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: lightColors.text,
    marginRight: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: typography.fontSizes.xs,
    color: lightColors.background,
    fontWeight: typography.fontWeights.bold,
  },
  teacher: {
    fontSize: typography.fontSizes.base,
    color: lightColors.text,
    marginBottom: spacing.xs,
  },
  subject: {
    fontSize: typography.fontSizes.base,
    color: lightColors.textSecondary,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.textSecondary,
  },
  duration: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.textSecondary,
  },
});

export default SessionCard;
