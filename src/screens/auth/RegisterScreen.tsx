import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Input } from '../../components/common';
import { lightColors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import i18n from '../../i18n';
import { validateEmail } from '../../utils/helpers';

interface Navigation {
  navigate: (screen: string) => void;
}

interface RegisterScreenProps {
  navigation: Navigation;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegister = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    navigation.navigate('RoleSelection');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('auth.register')}</Text>
          <Text style={styles.subtitle}>
            Create your account to get started
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label={i18n.t('auth.name')}
            placeholder={i18n.t('auth.namePlaceholder')}
            value={name}
            onChangeText={text => {
              setName(text);
              setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
          />

          <Input
            label={i18n.t('auth.email')}
            placeholder={i18n.t('auth.emailPlaceholder')}
            value={email}
            onChangeText={text => {
              setEmail(text);
              setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label={i18n.t('auth.password')}
            placeholder={i18n.t('auth.passwordPlaceholder')}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            secureTextEntry
            showPasswordToggle
          />

          <Input
            label={i18n.t('auth.confirmPassword')}
            placeholder={i18n.t('auth.passwordPlaceholder')}
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: '' });
            }}
            error={errors.confirmPassword}
            secureTextEntry
            showPasswordToggle
          />

          <Button
            title={i18n.t('auth.register')}
            onPress={handleRegister}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{i18n.t('auth.hasAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>{i18n.t('auth.login')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
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
  },
  form: {
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  footerText: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.textSecondary,
  },
  footerLink: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.primary,
    fontWeight: typography.fontWeights.semibold,
  },
});

export default RegisterScreen;
