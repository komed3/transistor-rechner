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
    
    useEffect( () => {
        const foundOp = Object.entries( OP_CONFIGS ).find( ( [ _, config ] ) => {
            return Object.entries( config ).every( ( [ key, val ] ) => ctrl[ key as keyof typeof ctrl ] === val );
        } );

        setSelectedOp( foundOp ? foundOp[ 0 ] : '' );
    }, [ ctrl ] );

    const toggleBit = ( val: number, bit: number ) => val ^ ( 1 << bit );
    const toggleCtrl = ( key: keyof typeof ctrl ) => {
        setCtrl( prev => ( { ...prev, [ key ]: !prev[ key ] } ) );
    };
  
    const setOperation = ( op: string ) => {
        const config = OP_CONFIGS[ op ];
        if ( config ) {
            setCtrl( config as typeof ctrl );
        }
    };

    const resetAll = () => {
        setRegA( 0 ), setRegB( 0 ), setSelectedOp( '' ), setCtrl( {
            invA: false, invB: false, inhC: false, inhAND: false,
            cin: false, invX: false, rs: false, ls: false
        } );
    };
    
    // ---- ALU Logic ----

    const workA = ctrl.invA ? ( ~regA & 0xFF ) : regA;
    const workB = ctrl.invB ? ( ~regB & 0xFF ) : regB;

    let res = 0;
    let carryOut = false;
    let halfCarry = false;

    if ( ctrl.ls ) {
        res = ( workA << 1 );
        carryOut = ( workA & 0x80 ) !== 0;
    } else if ( ctrl.rs ) {
        res = ( workA >> 1 );
        carryOut = ( workA & 0x01 ) !== 0;
    } else if ( ctrl.inhC ) {
        res = workA ^ workB;
    } else if ( ctrl.inhAND ) {
        res = workA | workB;
    } else {
        res = workA + workB + ( ctrl.cin ? 1 : 0 );
        carryOut = res > 0xFF;
        halfCarry = ( ( workA & 0x0F ) + ( workB & 0x0F ) + ( ctrl.cin ? 1 : 0 ) ) > 0x0F;
    }

    const finalX = ctrl.invX ? ( ~res & 0xFF ) : ( res & 0xFF );

    // ---- Flags ----

    const z = finalX === 0;
    const s = ( finalX & 0x80 ) !== 0;
    const c = carryOut;
    const p = finalX.toString( 2 ).split( '1' ).length % 2 === 0;
    const h = halfCarry;
    const v = ! ctrl.inhC && ! ctrl.inhAND && ! ctrl.ls && ! ctrl.rs && 
        ( ( workA & 0x80 ) === ( workB & 0x80 ) ) && ( ( res & 0x80 ) !== ( workA & 0x80 ) );

    // ---- Comparator ----

    const aEqB = regA === regB;
    const aGtB = regA > regB;
    
    const BitRow = ( { label, value, onToggle }: { label: string, value: number, onToggle: ( bit: number ) => void } ) => (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <div className="text-xs font-black opacity-50">{ label }</div>
                <div className="text-xs font-mono text-alu-blue font-bold">
                    { t.hex }: { value.toString( 16 ).toUpperCase().padStart( 2, '0' ) } | { t.dec }: { value }
                </div>
            </div>
            <div className="flex gap-1 sm:gap-2">
                { [7, 6, 5, 4, 3, 2, 1, 0].map( bit => (
                <button
                    key={bit}
                    onClick={ () => onToggle( bit ) }
                    className={`w-7 h-7 sm:w-10 sm:h-10 border-2 font-black text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                    ( value & ( 1 << bit ) ) ? "bg-alu-green text-black border-alu-green" : "border-alu-white/30 hover:border-alu-white"
                }` }
                >
                    { ( value & ( 1 << bit ) ) ? '1' : '0' }
                </button>
            ) ) }
        </div>
    </div> );

    return ( <BrutalistSection title={ t.simulatorTitle } color="yellow">
        <p className="text-lg mb-8 font-bold text-alu-yellow">{ t.simulatorDesc }</p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"></div>
    </BrutalistSection> );
};
