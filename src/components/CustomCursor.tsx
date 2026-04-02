import { useState, useEffect } from 'react';


export const CustomCursor = () => {
    const [ position, setPosition ] = useState( { x: 0, y: 0 } );
    const [ visible, setVisible ] = useState( false );

    useEffect( () => {
        const updatePosition = ( e: MouseEvent ) => {
            setPosition( { x: e.clientX, y: e.clientY } );
            if ( ! visible ) setVisible( true );
        };

        const handleMouseDown = ( e: MouseEvent ) => { if ( e.button === 1 ) e.preventDefault() };
        const handleLeave = () => setVisible( false );
        const handleEnter = () => setVisible( true );

        window.addEventListener( 'mousedown', handleMouseDown );
        window.addEventListener( 'mousemove', updatePosition );
        document.addEventListener( 'mouseleave', handleLeave );
        document.addEventListener( 'mouseenter', handleEnter );

        return () => {
            window.removeEventListener( 'mousedown', handleMouseDown );
            window.removeEventListener( 'mousemove', updatePosition );
            document.removeEventListener( 'mouseleave', handleLeave );
            document.removeEventListener( 'mouseenter', handleEnter );
        };
    }, [ visible ] );

    if ( ! visible ) return null;

    return ( <div
        className="custom-cursor hidden md:block"
        style={ { left: position.x, top: position.y } }
    /> );
};
