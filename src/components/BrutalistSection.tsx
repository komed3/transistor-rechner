import { ReactNode } from 'react';

interface BrutalistSectionProps {
    title: string;
    children: ReactNode;
    color?: 'white' | 'green' | 'blue' | 'pink' | 'yellow';
    id?: string;
}


export const BrutalistSection = ( { title, children, color = 'white', id }: BrutalistSectionProps ) => {
    const borderClass = 'border-4 border-alu-white';
    const shadowClass = 'brutalist-shadow-' + color;

    return ( <section id={ id } className="mb-24">
        <div className={ `inline-block px-6 py-2 bg-alu-white text-black font-black text-2xl mb-4 ${ shadowClass }` }>{ title }</div>
        <div className={ `bg-alu-bg p-4 md:p-8 ${ borderClass } ${ shadowClass }` }>{ children }</div>
    </section> );
};
