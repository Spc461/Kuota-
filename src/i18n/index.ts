import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import ar from './ar.json';
import fr from './fr.json';

const i18n = new I18n({
  ar,
  fr,
});

i18n.locale = getLocales()[0]?.languageCode ?? 'fr';
i18n.enableFallback = true;
i18n.defaultLocale = 'fr';

export const setLanguage = (language: 'ar' | 'fr') => {
  i18n.locale = language;
};

export const getCurrentLanguage = (): 'ar' | 'fr' => {
  return i18n.locale as 'ar' | 'fr';
};

export const isRTL = () => {
  return i18n.locale === 'ar';
};

export default i18n;
