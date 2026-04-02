import { ChevronRight } from 'lucide-react';
import type { Translation } from '../types';
import { BrutalistSection } from './BrutalistSection';


export const Functions = ( { t }: Translation ) => {
    return ( <BrutalistSection title={ t.functionsTitle } color="green">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-2xl md:text-3xl font-black mb-6 text-alu-green underline decoration-4 underline-offset-8">{ t.arithmetic }</h3>
                <ul className="space-y-4">
                    { t.arithmeticList.map( ( item: string, i: number ) => (
                        <li key={ i } className="flex items-center gap-4 text-lg md:text-xl font-bold">
                            <ChevronRight className="text-alu-green" /> { item }
                        </li>
                    ) ) }
                </ul>
            </div>
            <div>
                <h3 className="text-2xl md:text-3xl font-black mb-6 text-alu-blue underline decoration-4 underline-offset-8">{ t.logic }</h3>
                <ul className="space-y-4">
                    { t.logicList.map( ( item: string, i: number ) => (
                        <li key={ i } className="flex items-center gap-4 text-lg md:text-xl font-bold">
                            <ChevronRight className="text-alu-blue" /> { item }
                        </li>
                    ) ) }
                </ul>
            </div>
        </div>
    </BrutalistSection> );
};
