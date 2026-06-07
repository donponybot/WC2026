import { createContext, useContext, useState } from 'react';

const LangContext = createContext({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('wc26_lang') || 'en'
  );

  function changeLang(l) {
    setLang(l);
    localStorage.setItem('wc26_lang', l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
