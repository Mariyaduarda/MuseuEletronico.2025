import { useState, useEffect } from 'react';
import { Clock } from "lucide-react";

function Logo() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center">
            {/* logo no mesmo nível do restate do menu */}
            <div className="text-green-400 font-bold terminal-font text-2xl sm:text-xl md:text-xl lg:text-xl terminal-glow">
                QUINQUILHARIAS.TECH
            </div>

            {/* clock abaixo da logo */}
            <div className="flex items-center space-x-2 text-green-400 font-mono text-lg sm:text-lg md:text-lg lg:text-lg terminal-glow">
                <Clock className="w-4 h-4"/>
                <span className="text-green-400">{currentTime.toLocaleTimeString()}</span>
            </div>
        </div>
    );
}

export default Logo;