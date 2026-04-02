import { CircuitBoard, Cpu, EthernetPort, Hash } from 'lucide-react';
import type { Translation } from '../types';


export const Hero = ( { t }: Translation ) => {
    return ( <div className="mb-24">
        <div className="bg-alu-blue text-black p-4 md:p-6 inline-block brutalist-shadow-pink mb-8">
            <p className="text-lg md:text-3xl font-black tracking-widest">{ t.subtitle }</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-4 border-alu-white p-6 md:p-8 brutalist-shadow-green bg-alu-bg">
                <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
                    <Hash className="text-alu-green" /> { t.descriptionTitle }
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-4">{ t.descriptionBody }</p>
                <p className="text-alu-green font-bold italic text-sm md:text-base">{ t.aim }</p>
            </div>
            <div className="flex flex-col justify-center gap-4">
                <div className="flex items-center gap-4 bg-alu-green text-black p-4 font-black brutalist-shadow text-sm md:text-base">
                    <CircuitBoard /> DISCRETE_TRANSISTORS_ONLY
                </div>
                <div className="flex items-center gap-4 bg-alu-green text-black p-4 font-black brutalist-shadow text-sm md:text-base">
                    <EthernetPort /> 8-BIT_PROCESSING_SPAN
                </div>
                <div className="flex items-center gap-4 bg-alu-green text-black p-4 font-black brutalist-shadow text-sm md:text-base">
                    <Cpu /> NO_INTEGRATED_CIRCUITS
                </div>
            </div>
        </div>
    </div> );
};