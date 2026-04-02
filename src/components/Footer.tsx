import { SiGithub } from '@icons-pack/react-simple-icons';
import type { Translation } from '../types';


export const Footer = ( { t }: Translation ) => {
    return ( <footer className="mt-20 border-t-8 border-alu-white pt-12 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black mb-2">8-BIT_ALU</div>
                <div className="text-xs md:text-sm tracking-widest text-alu-green font-bold">{ t.footer }</div>
            </div>
          
            <div className="flex gap-4 md:gap-8">
                <a href="https://github.com/komed3/8-bit-alu" target="_blank" rel="noopener noreferrer" className="hover:text-alu-blue transition-colors">
                    <SiGithub className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-alu-white" />
                <div className="w-8 h-8 md:w-10 md:h-10 bg-alu-green" />
                <div className="w-8 h-8 md:w-10 md:h-10 bg-alu-blue" />
                <div className="w-8 h-8 md:w-10 md:h-10 bg-alu-pink" />
            </div>
        </div>
        <div className="mt-12 text-center text-[8px] md:text-[10px] text-gray-600 tracking-[0.5em] md:tracking-[1em]">{ t.credits }</div>
    </footer> );
};
