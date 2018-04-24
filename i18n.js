'use trict';
import I18n from 'react-native-i18n';
// OR const I18n = require('react-native-i18n').default

I18n.defaultLocale = 'vi';
// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

I18n.translations = {
  en: require('./translations/en.json'),  //eslint-disable-line
  vi: require('./translations/vi.json')   //eslint-disable-line
};


export default I18n;
