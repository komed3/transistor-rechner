import { useState, useEffect } from 'react';
import type { Translation } from '../types';
import { BrutalistSection } from './BrutalistSection';

export const Simulator = ( { t }: Translation ) => {
    const [ regA, setRegA ] = useState( 0 );
    const [ regB, setRegB ] = useState( 0 );
    const [ ctrl, setCtrl ] = useState( {
        invA: false, invB: false, inhC: false, inhAND: false,
        cin: false, invX: false, rs: false, ls: false
    } );

    const [ selectedOp, setSelectedOp ] = useState( 'add' );

    const OP_CONFIGS: Record< string, Partial< typeof ctrl > > = {
        add: { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: false },
        notA: { invA: true, invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: false },
        notB: { invA: false, invB: true, inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: false },
        xor: { invA: false, invB: false, inhC: true, inhAND: false, cin: false, invX: false, rs: false, ls: false },
        or: { invA: false, invB: false, inhC: false, inhAND: true, cin: false, invX: false, rs: false, ls: false },
        nand: { invA: true, invB: true, inhC: false, inhAND: true, cin: false, invX: false, rs: false, ls: false },
        inc: { invA: false, invB: false, inhC: false, inhAND: false, cin: true, invX: false, rs: false, ls: false },
        sub: { invA: false, invB: true, inhC: false, inhAND: false, cin: true, invX: false, rs: false, ls: false },
        notX: { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: true, rs: false, ls: false },
        xnor: { invA: false, invB: false, inhC: true, inhAND: false, cin: false, invX: true, rs: false, ls: false },
        nor: { invA: false, invB: false, inhC: false, inhAND: true, cin: false, invX: true, rs: false, ls: false },
        and: { invA: true, invB: true, inhC: false, inhAND: true, cin: false, invX: true, rs: false, ls: false },
        lsr: { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: true, ls: false },
        lsl: { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: true }
    };

    return ( <BrutalistSection title={ t.simulatorTitle } color="yellow">
        <p className="text-lg mb-8 font-bold text-alu-yellow">{ t.simulatorDesc }</p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"></div>
    </BrutalistSection> );
};
