import type { JSX } from "react";

interface FooterProps {
    temaEscuro: boolean;
}

function Footer({ temaEscuro }: FooterProps): JSX.Element {
    return (
        <footer
            style={{
                backgroundColor: '#1a1a1a'}}>
            className="relative z-20 text-xs border-t-2"
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <p className={`font-mono terminal-glow ${
                        temaEscuro
                            ? 'text-green-400'
                            : 'text-gray-700'
                    }`}>
                        © 2025
                        <br/>
                        QUINQUILHARIAS.TECH
                        <br/>
                        IFMG - Campus Formiga
                        <br/>
                        Projeto Frontend 2025.1, com professor Rai Caetano_
                    </p>
                    <p className={`font-mono text-[10px] mt-2 ${
                        temaEscuro
                            ? 'text-green-300'
                            : 'text-black'
                    }`}>
                        Museu Digital - Preservando a História da Tecnologia
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;