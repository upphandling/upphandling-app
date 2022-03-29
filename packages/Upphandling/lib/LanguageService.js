import merge from 'deepmerge'
import i18n from 'i18n-js'
import moment from 'moment'
import 'moment/locale/sv'
import { I18nManager } from 'react-native'
import { languages } from './translate'

const changeListeners = {}

let allString = {}

let Strings = {}
let languageCode
let momentLocale

const rtlList = {
  en: false,
  sv: false,
  ar: true,
}

export const isRTL = (langCode) => {
  if (!Object.prototype.hasOwnProperty.call(rtlList, langCode)) {
    return false
  }
  return rtlList[langCode]
}

const getCorrespondingMomentLocale = (languageCode) => {
  const lang = languages.find(({ langCode }) => langCode === languageCode)
  return lang?.locale || 'sv'
}

export const LanguageService = {
  get: () => Strings,
  getLanguageCode: () => languageCode,
  getLocale: () => momentLocale,
  setAllData: ({ data }) => {
    allString = data
  },
  seti18nConfig: ({ langCode }) => {
    i18n.defaultLocale = 'sv'
    if (langCode) {
      i18n.translations = { [langCode]: Strings }
      i18n.locale = langCode
      I18nManager.forceRTL(isRTL(langCode))
    }
    moment.locale(momentLocale)
  },
  setLanguageCode: ({ langCode }) => {
    if (langCode && allString[langCode]) {
      languageCode = langCode
      momentLocale = getCorrespondingMomentLocale(langCode)
      Strings = merge(allString.sv, allString[langCode])
    } else {
      const dataKeys = Object.keys(allString)
      languageCode = dataKeys[0]
      Strings = allString[languageCode]
    }
    Object.keys(changeListeners).forEach((k) => {
      changeListeners[k](langCode)
    })
    return Strings
  },
  onChange: ({ key }, cb) => {
    const unsubscribe = () => {
      delete changeListeners[key]
    }
    changeListeners[key] = (langCode) => cb(langCode)

    return unsubscribe
  },
}

export const i18nService = i18n
