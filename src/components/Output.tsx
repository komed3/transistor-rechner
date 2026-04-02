import { ChevronsLeftRightEllipsis, GitCompare } from 'lucide-react';
import type { Translation } from '../types';


export const Output = ( { t }: Translation ) => {
    return ( <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <div className="border-4 border-alu-white p-6 md:p-8 brutalist-shadow-blue bg-alu-bg">
            <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-alu-blue text-black flex items-center justify-center text-sm md:text-base">
                    <ChevronsLeftRightEllipsis className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                { t.outputTitle }
            </h2>
            <p className="text-base md:text-lg mb-8 text-gray-300">{ t.outputDesc }</p>

            <h3 className="text-lg md:text-xl font-black mb-4 text-alu-blue">{ t.statusRegisterTitle }</h3>
            <div className="space-y-4">
                { t.flags.map( ( flag: { f: string; name: string; desc: string }, i: number ) => (
                    <div key={ i } className="flex gap-4 border-b border-alu-white/20 pb-2">
                        <div className="text-3xl font-black text-alu-blue min-w-[25px] md:min-w-[30px]">{ flag.f }</div>
                        <div>
                            <div className="font-bold text-sm md:text-base">{ flag.name }</div>
                            <div className="text-[10px] md:text-xs text-gray-400">{ flag.desc }</div>
                        </div>
                    </div>
                ) ) }
            </div>
        </div>

        <div className="border-4 border-alu-white p-6 md:p-8 brutalist-shadow-pink bg-alu-bg">
            <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-alu-pink text-black flex items-center justify-center text-sm md:text-base">
                    <GitCompare className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                { t.comparatorTitle }
            </h2>
            <p className="text-base md:text-lg mb-8 text-gray-300">{ t.comparatorDesc }</p>

            <div className="space-y-8">
                { t.comparatorOutputs.map( ( out: { name: string; desc: string }, i: number ) => (
                    <div key={ i } className="border-4 border-alu-pink p-4 brutalist-shadow">
                        <div className="text-xl md:text-2xl font-black mb-1 text-alu-pink">{ out.name }</div>
                        <div className="text-xs md:text-sm font-bold">{ out.desc }</div>
                    </div>
                ) ) }
            </div>
        </div>
    </div> );
};
