import React, { useState, useEffect } from 'react'
import * as RNLocalize from 'react-native-localize'
import { LanguageService } from '../lib/LanguageService'
import { translations } from '../lib/translate'

import AppStorage from '../lib/AppStorage'

export const LanguageContext = React.createContext({
  Strings: {},
  languageCode: '',
})

export const LanguageProvider = ({
  children,
  data,
  initialLanguageCode,
  cache,
}) => {
  const fallBack = { languageTag: 'sv', isRTL: false }

  LanguageService.setAllData({ data })

  const [languageCode, setLanguageCode] = useState(undefined)

  const setLanguageConfig = (langCode) => {
    LanguageService.setLanguageCode({ langCode })
    LanguageService.seti18nConfig({ langCode })
    setLanguageCode(langCode)
  }

  const [Strings, setStrings] = useState(() => {
    if (initialLanguageCode && data[initialLanguageCode]) {
      setLanguageConfig(initialLanguageCode)

      return data[initialLanguageCode]
    }

    const { languageTag } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
      fallBack

    const bestStrings = data[languageTag]

    return bestStrings
  })

  useEffect(() => {
    LanguageService.onChange({ key: 'LanguageProvider' }, (langCode) => {
      if (langCode && data[langCode]) {
        setLanguageCode(langCode)
        setStrings(data[langCode])
        if (cache) {
          AppStorage.setSetting('langCode', langCode)
        }
      }
    })

    const checkLanguageLocal = async () => {
      // Saved language
      if (cache) {
        // Get cached lang
        const cachedLang = await AppStorage.getSetting('langCode')

        // Try to find best suited language
        const { languageTag } =
          RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
          fallBack

        const currentLanguageCode = cachedLang || languageTag

        setLanguageConfig(currentLanguageCode)
      }
    }
    checkLanguageLocal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LanguageContext.Provider value={{ Strings, languageCode: languageCode }}>
      {children}
    </LanguageContext.Provider>
  )
}
