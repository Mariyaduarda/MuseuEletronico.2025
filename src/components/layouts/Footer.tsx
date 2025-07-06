import type {JSX} from "react";

function Footer(): JSX.Element {

    return (
        <footer className="relative z-20 text-xs bg-black border-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-green-400 font-mono terminal-glow">
                        © 2025
                        <br/>
                        QUINQUILHARIAS.TECH
                        <br/>
                        IFMG - Campus Formiga
                    </p>
                    <p className="text-green-300 font-mono text-[5px] ">
                        <br/>
                        &gt; SLOGAN LEGAL_
                    </p>
                </div>
            </div>
        </footer>
    );
} export default Footer;