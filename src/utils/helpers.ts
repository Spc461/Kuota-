import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { fr, ar } from 'date-fns/locale';

export const formatDate = (
  date: string | Date,
  formatStr: string = 'PPP',
  language: 'ar' | 'fr' = 'fr'
): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const locale = language === 'ar' ? ar : fr;
  return format(dateObj, formatStr, { locale });
};

export const formatTimeAgo = (
  date: string | Date,
  language: 'ar' | 'fr' = 'fr'
): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const locale = language === 'ar' ? ar : fr;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(00213|\+213|0)(5|6|7)[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('00213')) {
    return `+213 ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)} ${cleaned.slice(12)}`;
  }
  if (cleaned.startsWith('+213')) {
    return `+213 ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)} ${cleaned.slice(11)}`;
  }
  if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const calculateRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('fr-DZ')} DA`;
};

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
};
