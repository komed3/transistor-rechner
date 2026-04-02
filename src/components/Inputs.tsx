import type { Translation } from '../types';
import { BrutalistSection } from './BrutalistSection';


export const Inputs = ( { t }: Translation ) => {
    return ( <BrutalistSection title={ t.inputsTitle } color="blue">
        <p className="text-lg md:text-xl mb-8 font-bold text-alu-blue">{ t.inputsSubtitle }</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            { t.controlLines.map( ( line: any, i: number ) => (
                <div key={i} className="border-2 border-alu-blue p-4">
                    <div className="text-xl md:text-2xl font-black mb-1">{ line.name }</div>
                    <div className="text-[10px] md:text-xs uppercase tracking-tighter opacity-70">{ line.desc }</div>
                </div>
            ) ) }
        </div>
    </BrutalistSection> );
};
