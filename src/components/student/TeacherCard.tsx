import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from '../common';
import { Teacher } from '../../types/models';
import { lightColors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { DEFAULT_AVATAR } from '../../utils/constants';

interface TeacherCardProps {
  teacher: Teacher;
  onPress: () => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: teacher.profilePicture || DEFAULT_AVATAR }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{teacher.name}</Text>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>
                ⭐ {teacher.rating.toFixed(1)}
              </Text>
              <Text style={styles.reviewCount}>({teacher.totalReviews})</Text>
            </View>
          </View>
        </View>

        <View style={styles.subjects}>
          {teacher.subjects.slice(0, 3).map((subject, index) => (
            <View key={index} style={styles.subjectBadge}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          ))}
          {teacher.subjects.length > 3 && (
            <Text style={styles.moreSubjects}>
              +{teacher.subjects.length - 3}
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.students}>
            👥 {teacher.totalStudents} students
          </Text>
          {teacher.pricing.length > 0 && (
            <Text style={styles.price}>From {teacher.pricing[0].price} DA</Text>
          )}
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
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: lightColors.text,
    marginBottom: spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.text,
    marginRight: spacing.xs,
  },
  reviewCount: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.textSecondary,
  },
  subjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  subjectBadge: {
    backgroundColor: lightColors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  subjectText: {
    fontSize: typography.fontSizes.xs,
    color: lightColors.background,
    fontWeight: typography.fontWeights.medium,
  },
  moreSubjects: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.textSecondary,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  students: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.textSecondary,
  },
  price: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: lightColors.primary,
  },
});

export default TeacherCard;
