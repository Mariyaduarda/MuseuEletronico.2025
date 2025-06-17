import React from "react";

export interface NavButtonProps {
    children: React.RectNode;
    active: boolean;
    onClick: () => void;
}

/*
* componentes navbar
*/
export function NavButton({ children, active, onClick }: NavButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={`
                relative px-4 py-3 font-semibodld text-lg transition-all duration-300
                ${active
                ? 'text-white'
                : 'text-white hover-neon-green text-white'
            }
            `}
        >
            {children}
            <div className={`
                absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all duration-300
                ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
            `}></div>
        </button>
    );
}

export function Home(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-"></h1>
        </div>
    );
}