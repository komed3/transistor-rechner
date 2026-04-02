import { useState } from 'react';

import { translations } from './translations';
import { CircuitBackground } from './components/CircuitBackground';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScanLine } from './components/ScanLine';


export default function App () {
    const [ lang, setLang ] = useState< 'en' | 'de' >( 'en' );
    const t = translations[ lang ];

    return ( <div className="relative min-h-screen flex flex-col p-4 md:p-12 bg-alu-bg text-alu-white overflow-x-hidden">
        <CustomCursor />
        <CircuitBackground />
        <ScanLine />
        
        <Header t={t} lang={lang} setLang={setLang} />
        <Footer t={t} />
    </div> );
}
