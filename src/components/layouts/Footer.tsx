import type {JSX} from "react";

function Footer(): JSX.Element {

    return (
        <footer className="relative z-20 text-xs bg-black border-white flex">
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <p className="text-green-400 font-mono terminal-glow text-lg lg:text-xl xl:text-2xl ">
                    
                    © 2025
                    <br/>
                    QUINQUILHARIAS.TECH
                    <br/>
                    IFMG - Campus Formiga
                </p>
                <p className="text-green-400 font-mono terminal-glow text-md lg:text-lg xl:text-xl ">
                    &gt; SLOGAN LEGAL_
                </p>
            </div>
        </footer>
    );
} export default Footer;