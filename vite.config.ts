import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


const cnamePlugin = () => ( {
    name: 'cname-plugin',
    generateBundle () {
        this.emitFile( {
            type: 'asset',
            fileName: 'CNAME',
            source: 'transistor-rechner.de'
        } );
    }
} );

export default defineConfig( () => {
    return {
        plugins: [ react(), tailwindcss(), cnamePlugin() ],
        resolve: { alias: { '@': resolve( __dirname, '.' ) } },
        build: {
            chunkSizeWarningLimit: 2000,
            cssCodeSplit: true,
            rollupOptions: { output: { manualChunks ( id ) {
                if ( id.includes( 'node_modules' ) ) {
                    if ( id.includes( 'lucide' ) || id.includes( 'simple-icons' ) ) return 'icons';
                    if ( id.includes( 'motion' ) ) return 'motion';
                    if ( id.includes( 'react' ) ) return 'react';
                    return 'vendor';
                }
            } } }
        }
    };
} );
