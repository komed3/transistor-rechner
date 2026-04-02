import type { translations } from './translations';

export interface Translation {
    t: typeof translations[ 'en' | 'de' ];
}

export interface Language {
    lang: 'en' | 'de';
    setLang: ( lang: 'en' | 'de' ) => void;
}
