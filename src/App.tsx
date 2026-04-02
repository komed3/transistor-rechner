import { CircuitBackground } from './components/CircuitBackground';
import { CustomCursor } from './components/CustomCursor';


export default function App () {
    return ( <div className="relative min-h-screen flex flex-col p-4 md:p-12 bg-alu-bg text-alu-white overflow-x-hidden">
        <CircuitBackground />
        <CustomCursor />
    </div> );
}
