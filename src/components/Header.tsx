import { SiGithub } from '@icons-pack/react-simple-icons';
import { Globe } from 'lucide-react';

interface HeaderProps {
    t: any;
    lang: 'en' | 'de';
    setLang: ( lang: 'en' | 'de' ) => void;
}


export const Header = ( { t, lang, setLang }: HeaderProps ) => {
    return ( <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-20 z-10">
        <div className="bg-alu-white text-black p-4 brutalist-shadow-green">
            <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-none">{t.title}</h1>
        </div>

        <div className="flex flex-wrap gap-4">
            <button 
                onClick={ () => setLang( lang === 'en' ? 'de' : 'en' )}
                className="bg-alu-yellow text-black px-4 md:px-6 py-2 md:py-3 font-black brutalist-shadow-blue border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer flex items-center gap-2 text-sm md:text-base"
            >
                <Globe className="w-4 h-4 md:w-5 md:h-5" />
                { lang.toUpperCase() }
            </button>

            <a 
                href="https://github.com/komed3/8-bit-alu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-alu-green text-black px-4 md:px-6 py-2 md:py-3 font-black brutalist-shadow border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer flex items-center gap-2 text-sm md:text-base"
            >
                <SiGithub className="w-4 h-4 md:w-5 md:h-5" />
                { t.github }
            </a>
        </div>
    </header> );
};
