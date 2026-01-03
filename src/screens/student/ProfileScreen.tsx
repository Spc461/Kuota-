import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button, Card } from '../../components/common';
import { lightColors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import i18n from '../../i18n';

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>User Name</Text>
        <Text style={styles.email}>user@example.com</Text>
      </View>

      <View style={styles.section}>
        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              {i18n.t('settings.language')}
            </Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>{i18n.t('settings.theme')}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              {i18n.t('settings.notifications')}
            </Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              {i18n.t('settings.privacy')}
            </Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>{i18n.t('settings.about')}</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.logoutContainer}>
        <Button
          title={i18n.t('auth.logout')}
          onPress={() => {}}
          variant="outline"
          fullWidth
        />
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
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: lightColors.primary,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: lightColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 48,
  },
  name: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: lightColors.background,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSizes.base,
    color: lightColors.background,
    opacity: 0.9,
  },
  section: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  menuItemText: {
    fontSize: typography.fontSizes.base,
    color: lightColors.text,
  },
  menuItemArrow: {
    fontSize: typography.fontSizes.xl,
    color: lightColors.textSecondary,
  },
  logoutContainer: {
    padding: spacing.lg,
  },
});

export default ProfileScreen;
