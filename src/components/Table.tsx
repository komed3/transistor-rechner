import type { Translation } from '../types';
import { BrutalistSection } from './BrutalistSection';


export const Table = ( { t }: Translation ) => {
    const rows = [
        [ '0', '0', '0', '0', '0', '0', '0', '0', 'ADD' ],
        [ '0', '0', '0', '0', '0', '0', '0', '1', 'NOT A' ],
        [ '0', '0', '0', '0', '0', '0', '1', '0', 'NOT B' ],
        [ '0', '0', '0', '0', '0', '1', '0', '0', 'XOR' ],
        [ '0', '0', '0', '0', '1', '0', '0', '0', 'OR' ],
        [ '0', '0', '0', '0', '1', '0', '1', '1', 'NAND' ],
        [ '0', '0', '0', '1', '0', '0', '0', '0', 'INC' ],
        [ '0', '0', '0', '1', '0', '0', '1', '0', 'SUB' ],
        [ '0', '0', '1', '0', '0', '0', '0', '0', 'NOT X' ],
        [ '0', '0', '1', '0', '0', '1', '0', '0', 'XNOR' ],
        [ '0', '0', '1', '0', '1', '0', '0', '0', 'NOR' ],
        [ '0', '0', '1', '0', '1', '0', '1', '1', 'AND' ],
        [ '0', '1', '0', '0', '0', '0', '0', '0', 'LSR' ],
        [ '1', '0', '0', '0', '0', '0', '0', '0', 'LSL' ]
    ];

    return ( <BrutalistSection title={ t.codingTableTitle } color="pink">
        <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full border-collapse border-4 border-alu-white text-center font-bold text-xs md:text-base min-w-[600px]">
                <thead>
                    <tr className="bg-alu-white text-black">
                        <th className="p-2 border-2 border-black">LS</th>
                        <th className="p-2 border-2 border-black">RS</th>
                        <th className="p-2 border-2 border-black">~X</th>
                        <th className="p-2 border-2 border-black">Cin</th>
                        <th className="p-2 border-2 border-black">~AND</th>
                        <th className="p-2 border-2 border-black">~C</th>
                        <th className="p-2 border-2 border-black">~B</th>
                        <th className="p-2 border-2 border-black">~A</th>
                        <th className="p-2 border-2 border-black">FNC</th>
                    </tr>
                </thead>
                <tbody>
                    { rows.map( ( row: string[], i: number ) => (
                        <tr key={ i } className="hover:bg-alu-pink hover:text-black transition-colors">
                            { row.map( ( cell: string, j: number ) => (
                                <td key={ j } className="p-2 border-2 border-alu-white">{ cell }</td>
                            ) ) }
                        </tr>
                    ) ) }
                </tbody>
            </table>
        </div>
    </BrutalistSection> );
};
