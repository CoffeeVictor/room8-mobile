import { useContext, useState, useCallback } from 'react';
import { languageEn } from '../../assets/language/en.json';
import { languagePt } from '../../assets/language/pt.json';
import { createContext } from 'react';

const LanguageContext = createContext({
  language: languageEn,
  setLanguage: () => {},
});

export function useLan() {
  return useContext(LanguageContext);
}

export const LanguangeProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState(languageEn);

  const handleLanguageChange = useCallback(async () => {
    if (language.lan === 'en') {
      setLanguage(languagePt);
    } else {
      setLanguage(languageEn);
    }
    console.log(language.lan);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language: language,
        setLanguage: handleLanguageChange,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
