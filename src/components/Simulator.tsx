import type { Translation } from '../types';
import { BrutalistSection } from './BrutalistSection';

export const Simulator = ( { t }: Translation ) => {
    return ( <BrutalistSection title={ t.simulatorTitle } color="yellow">
        <p className="text-lg mb-8 font-bold text-alu-yellow">{ t.simulatorDesc }</p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"></div>
    </BrutalistSection> );
};
