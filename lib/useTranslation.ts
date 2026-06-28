// lib/useTranslation.ts
'use client';

import { useEffect, useState } from 'react';
import { getTranslation, getLanguageFromLocalStorage, Language, Translations } from './translations';

export function useTranslation() {
  const [lang, setLang] = useState<Language>('en');
  const [t, setT] = useState<Translations>(getTranslation('en'));

  useEffect(() => {
    const currentLang = getLanguageFromLocalStorage();
    setLang(currentLang);
    setT(getTranslation(currentLang));

    const handleStorageChange = () => {
      const newLang = getLanguageFromLocalStorage();
      setLang(newLang);
      setT(getTranslation(newLang));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLanguage = (newLang: Language) => {
    localStorage.setItem('language', newLang);
    setLang(newLang);
    setT(getTranslation(newLang));
    window.dispatchEvent(new Event('storage'));
  };

  return { t, lang, setLanguage };
}