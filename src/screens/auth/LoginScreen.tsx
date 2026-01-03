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
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import i18n from '../../i18n';
import { validateEmail, validatePhone } from '../../utils/helpers';

interface Navigation {
  navigate: (screen: string) => void;
}

interface LoginScreenProps {
  navigation: Navigation;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = () => {
    const newErrors: { [key: string]: string } = {};

    if (loginMethod === 'email') {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(email)) {
        newErrors.email = 'Invalid email format';
      }
    } else {
      if (!phone) {
        newErrors.phone = 'Phone is required';
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Invalid phone format';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('auth.login')}</Text>
          <Text style={styles.subtitle}>{i18n.t('common.welcome')}</Text>
        </View>

        <View style={styles.methodToggle}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              loginMethod === 'email' && styles.methodButtonActive,
            ]}
            onPress={() => setLoginMethod('email')}
          >
            <Text
              style={[
                styles.methodButtonText,
                loginMethod === 'email' && styles.methodButtonTextActive,
              ]}
            >
              {i18n.t('auth.email')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodButton,
              loginMethod === 'phone' && styles.methodButtonActive,
            ]}
            onPress={() => setLoginMethod('phone')}
          >
            <Text
              style={[
                styles.methodButtonText,
                loginMethod === 'phone' && styles.methodButtonTextActive,
              ]}
            >
              {i18n.t('auth.phone')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {loginMethod === 'email' ? (
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
          ) : (
            <Input
              label={i18n.t('auth.phone')}
              placeholder={i18n.t('auth.phonePlaceholder')}
              value={phone}
              onChangeText={text => {
                setPhone(text);
                setErrors({ ...errors, phone: '' });
              }}
              error={errors.phone}
              keyboardType="phone-pad"
            />
          )}

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

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              {i18n.t('auth.forgotPassword')}
            </Text>
          </TouchableOpacity>

          <Button
            title={i18n.t('auth.login')}
            onPress={handleLogin}
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{i18n.t('auth.noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>{i18n.t('auth.register')}</Text>
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
  methodToggle: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    borderRadius: borderRadius.md,
    backgroundColor: lightColors.surface,
    padding: spacing.xs,
  },
  methodButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  methodButtonActive: {
    backgroundColor: lightColors.primary,
  },
  methodButtonText: {
    fontSize: typography.fontSizes.base,
    color: lightColors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  methodButtonTextActive: {
    color: lightColors.background,
  },
  form: {
    marginBottom: spacing.lg,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    fontSize: typography.fontSizes.sm,
    color: lightColors.primary,
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

export default LoginScreen;
