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
        add:  { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: false },
        notA: { invA: true,  invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: false },
        notB: { invA: false, invB: true,  inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: false },
        xor:  { invA: false, invB: false, inhC: true,  inhAND: false, cin: false, invX: false, rs: false, ls: false },
        or:   { invA: false, invB: false, inhC: false, inhAND: true,  cin: false, invX: false, rs: false, ls: false },
        nand: { invA: true,  invB: true,  inhC: false, inhAND: true,  cin: false, invX: false, rs: false, ls: false },
        inc:  { invA: false, invB: false, inhC: false, inhAND: false, cin: true,  invX: false, rs: false, ls: false },
        sub:  { invA: false, invB: true,  inhC: false, inhAND: false, cin: true,  invX: false, rs: false, ls: false },
        notX: { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: true,  rs: false, ls: false },
        xnor: { invA: false, invB: false, inhC: true,  inhAND: false, cin: false, invX: true,  rs: false, ls: false },
        nor:  { invA: false, invB: false, inhC: false, inhAND: true,  cin: false, invX: true,  rs: false, ls: false },
        and:  { invA: true,  invB: true,  inhC: false, inhAND: true,  cin: false, invX: true,  rs: false, ls: false },
        lsr:  { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: true,  ls: false },
        lsl:  { invA: false, invB: false, inhC: false, inhAND: false, cin: false, invX: false, rs: false, ls: true  }
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
                { [7, 6, 5, 4, 3, 2, 1, 0].map( ( bit: number ) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/** Inputs */}
            <div className="lg:col-span-7 space-y-8">
                <BitRow label={ t.registerA } value={ regA } onToggle={ ( bit ) => setRegA( toggleBit( regA, bit ) ) } />
                <BitRow label={ t.registerB } value={ regB } onToggle={ ( bit ) => setRegB( toggleBit( regB, bit ) ) } />

                <div className="space-y-2">
                    <div className="text-xs font-black opacity-50">{ t.controlLinesTitle }</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        { Object.keys( ctrl ).map( ( key: string ) => (
                        <button
                            key={ key }
                            onClick={ () => toggleCtrl( key as keyof typeof ctrl ) }
                            className={ `p-2 border-2 font-black text-[10px] sm:text-xs text-center transition-all cursor-pointer ${
                            ctrl[ key as keyof typeof ctrl ] ? 'bg-alu-blue text-black border-alu-blue' : 'border-alu-white/30 hover:border-alu-white'
                            }` }
                        >
                            { key.toUpperCase() }
                        </button>
                    ) ) }</div>

                    <div className="mt-8 pt-6 border-t-2 border-alu-white/10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                            <div className="space-y-3">
                                <div className="text-xs font-black opacity-50 uppercase tracking-widest">{ t.opsTitle }</div>
                                <div className="relative group">
                                    <select
                                        value={ selectedOp }
                                        onChange={ ( e ) => setOperation( e.target.value ) }
                                        className="w-full p-3 bg-black border-2 border-alu-white/30 text-alu-white font-black text-xs appearance-none cursor-pointer focus:border-alu-blue focus:outline-none transition-all brutalist-shadow-sm"
                                    >
                                        <option value="" disabled>{ t.ops.custom }</option>
                                        { Object.entries( t.ops ).map( ( [ key, label ] ) => (
                                            key !== 'custom' && ( <option key={ key } value={ key } className="bg-black text-alu-white">{ label as string }</option> )
                                        ) ) }
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-alu-white/30 group-hover:text-alu-blue transition-colors text-[8px]">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={ resetAll }
                                className="h-[46px] p-2 border-2 border-alu-pink text-alu-pink font-black text-xs hover:bg-alu-pink hover:text-black transition-all cursor-pointer brutalist-shadow-pink active:translate-x-1 active:translate-y-1 active:shadow-none"
                            >
                                { t.clear }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/** Results */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="border-4 border-alu-white p-6 brutalist-shadow-pink bg-black">
                    <div className="text-xs font-black mb-4 text-alu-pink">{ t.outputX }</div>
                    <div className="flex justify-between items-end mb-4">
                        <div className="text-4xl sm:text-6xl font-black tracking-tighter">
                            { finalX.toString( 16 ).toUpperCase().padStart( 2, '0' ) }
                        </div>
                        <div className="text-right font-mono text-xs opacity-50">
                            { t.dec }: { finalX }<br />
                            { t.bin }: { finalX.toString( 2 ).padStart( 8, '0' ) }
                        </div>
                    </div>
                    <div className="flex gap-1">
                        { finalX.toString( 2 ).padStart( 8, '0' ).split( '' ).map( ( bit: string, i: number ) => (
                            <div key={ i } className={ `flex-grow h-2 ${ bit === '1' ? 'bg-alu-pink' : 'bg-alu-pink/20' }` } />
                        ) ) }
                    </div>
                </div>

                <div className="border-4 border-alu-white p-6 brutalist-shadow-green bg-black flex-grow flex flex-col">
                    <div className="text-xs font-black mb-4 text-alu-green">{ t.statusRegister }</div>
                    <div className="grid grid-cols-3 gap-2">
                        { t.flags.map( ( flag: any, i: number ) => {
                            const values = [ c, v, s, z, ! p, h ];
                            const isActive = values[ i ];
                            return ( <div key={ i } className={ `border-2 p-2 text-center transition-all ${
                                isActive ? 'border-alu-green bg-alu-green text-black' : 'border-alu-white/20 text-alu-white/30'
                            }` }>
                                <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter leading-none">{ flag.name }</div>
                            </div> );
                        } ) }
                    </div>
                    <div className="mt-auto pt-6 flex gap-4">
                        <div className={ `flex-grow border-2 p-2 text-center text-[10px] font-black ${ aEqB ? 'border-alu-yellow text-alu-yellow' : 'border-alu-white/5 text-alu-white/20' }` }>A=B</div>
                        <div className={ `flex-grow border-2 p-2 text-center text-[10px] font-black ${ aGtB ? 'border-alu-yellow text-alu-yellow' : 'border-alu-white/5 text-alu-white/20' }` }>A&gt;B</div>
                        <div className={ `flex-grow border-2 p-2 text-center text-[10px] font-black ${ ( ! aEqB && ! aGtB ) ? 'border-alu-yellow text-alu-yellow' : 'border-alu-white/5 text-alu-white/20' }` }>A&lt;B</div>
                    </div>
                </div>
            </div>
        </div>
    </BrutalistSection> );
};
