import { useState } from 'react';

import { translations } from './translations';
import { CircuitBackground } from './components/CircuitBackground';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { Functions } from './components/Functions';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Inputs } from './components/Inputs';
import { ScanLine } from './components/ScanLine';
import { Table } from './components/Table';


export default function App () {
    const [ lang, setLang ] = useState< 'en' | 'de' >( 'en' );
    const t = translations[ lang ];

    return ( <div className="relative min-h-screen flex flex-col p-4 md:p-12 bg-alu-bg text-alu-white overflow-x-hidden">
        <CustomCursor />
        <CircuitBackground />
        <ScanLine />

        <Header t={t} lang={lang} setLang={setLang} />
        <main className="max-w-7xl mx-auto w-full z-10">
            <Hero t={t} />
            <Inputs t={t} />
            <Functions t={t} />
            <Table t={t} />
        </main>
        <Footer t={t} />
    </div> );
}
