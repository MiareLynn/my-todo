import { createContext, useContext, useState } from 'react';
import type { Lang } from './i18n';
import { messages } from './i18n';

interface LangContextValue {
  lang: Lang;
  t: typeof messages['zh'];
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue>(null!);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');
  const toggleLang = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'));

  return (
    <LangContext.Provider value={{ lang, t: messages[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
