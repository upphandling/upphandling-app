import i18n, { TranslateOptions } from 'i18n-js'

export const languages = [
  {
    langCode: 'sv',
    languageName: 'Swedish',
    languageLocalName: 'Svenska',
    locale: 'sv',
    active: true,
  },
  {
    langCode: 'en',
    languageName: 'English',
    languageLocalName: 'English',
    locale: 'en',
    active: true,
  },
]

export const translations = {
  en: require('../translations/en.json'),
  sv: require('../translations/sv.json'),
}

export const translate = (key, options) => {
  return i18n.t(key, options)
}
