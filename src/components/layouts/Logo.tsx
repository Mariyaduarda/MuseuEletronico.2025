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
            <div className="text-green-400 font-bold terminal-font mb-2 text-[7px]"
                 style={{
                     textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00'
                 }}>
                QUINQUILHARIAS.TECH
            </div>

            {/* clock abaixo da logo */}
            <div className="flex items-center space-x-2 text-green-400 font-mono text-[7px]">
                <Clock className="w-4 h-4"/>
                <span className="text-green-300">{currentTime.toLocaleTimeString()}</span>
            </div>
        </div>
    );
}

export default Logo;