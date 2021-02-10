import I18n from 'i18n-js';
import { NativeModules, Platform } from 'react-native';
import en from './en_US';
import pt from './pt-BR';

const normalizeTranslate: any = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
  es_ES: 'es_ES',
  pt_US: 'pt_BR',
  fr: 'fr_FR',
  fr_FR: 'fr_FR',
  de: 'de_DE',
  de_DE: 'de_DE',
  ru: 'ru_RU',
  ru_RU: 'ru_RU',
};

const getLanguageByDevice = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
};

I18n.translations = {
  en_US: en,
  pt_BR: pt,
};
const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize,
  );
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'en_US');
};

setLanguageToI18n();

export const translate = (key: string) => I18n.t(key);
