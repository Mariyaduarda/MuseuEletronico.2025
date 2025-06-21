import React, {type JSX, useState} from "react";
import Logo from './Logo.tsx'
import {HomeIcon} from "lucide-react";
import Carrossel from "../secoes/Home.tsx";
import TechBRs from "../secoes/TechsBRs.tsx";

// SPA = tipos para as seções disponíveis
type Secao = "home" | "eletronico" | "sobre" | "tecnologias-brasileiras";

// Interface para props do NavButton
interface NavButtonProps {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
}

function MenuBar(): JSX.Element {
    const [secaoAtual, setSecaoAtual] = useState<Secao>("home");
    const [crtAtivo, setCrtAtiva] = useState<boolean>(true);

    /* decide qual componetne  mostrar */
    const renderSecao = (): JSX.Element => {
        switch (secaoAtual) {
            case "home":
                return <Home/>;
            case "eletronico":
                return <Eletronicos/>;
            case "sobre":
                return <Sobre/>;
            case "tecnologias-brasileiras":
                return <TecnologiasBrasileiras/>;
            default:
                return <Home/>;
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
                    
                    .terminal-font {
                        font-family: 'JetBrains Mono', 'Courier New', monospace !important;
                        letter-spacing: 0.025em !important;
                    }
                    
                    .terminal-glow {
                        text-shadow: 0 0 5px currentColor, 0 0 10px currentColor !important;
                    }
                `
            }} />

            <div className={`min-h-screen text-sm bg-black text-white terminal-font ${crtAtivo ? 'crt-container' : ''}`}>
                {/* Efeitos CRT */}
                {crtAtivo && (
                    <>
                        <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
                        <div className="flicker fixed inset-0 pointer-events-none z-40"></div>
                        <div className="noise fixed inset-0 pointer-events-none z-30"></div>
                    </>
                )}

                {/* botão toggle CRT on/off */}
                <button
                    onClick={() => setCrtAtiva(!crtAtivo)}
                    className="fixed top-2 right-2 z-30 px-0.1 py-0.1 bg-green-400/20 border border-green-400 text-green-400 hover:bg-green-400/30 transition-all duration-300 text-sm terminal-font"
                    style={{
                        textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00'
                    }}
                >
                    CRT: {crtAtivo ? 'ON' : 'OFF'}
                </button>

                <div className={`${crtAtivo ? 'screen-curve' : ''} min-h-screen`}>
                    {/* menu de navegação entre seções */}

                    <nav className="relative p-6">
                        <div className="relative z-10 flex flex-wrap gap-8 justify-center text-xs">
                            {/* chama o componente logo - quinquilharias.tech + clock*/}
                            <Logo/>

                            {/* vai mudar de cor de acordo com a seção selecionada, tendo um underline*/}
                            <NavButton
                                active={secaoAtual === "home"}
                                onClick={() => setSecaoAtual("home")}
                            >
                                {/* procurar um homeicon melhor OU ajeitar o underline/barrinah*/}
                                <HomeIcon size={14} className="inline-lock mr-1"/>
                            </NavButton>
                            <NavButton
                                active={secaoAtual === "eletronico"}
                                onClick={() => setSecaoAtual("eletronico")}
                            >
                                Eletrônicos 3D
                            </NavButton>
                            <NavButton
                                active={secaoAtual === "sobre"}
                                onClick={() => setSecaoAtual("sobre")}
                            >
                                Sobre
                            </NavButton>
                            <NavButton
                                active={secaoAtual === "tecnologias-brasileiras"}
                                onClick={() => setSecaoAtual("tecnologias-brasileiras")}
                            >
                                Techs Brasileiras
                            </NavButton>
                        </div>
                    </nav>
                    {/* add borda dps do menu*/}
                    <main className="p-6 border-t-1 border-white">
                        {renderSecao()}
                    </main>
                </div>
            </div>
        </>
    );
}

// componente NavButton
function NavButton({ children, active, onClick }: NavButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={`
                relative px-0.1 py-2 terminal-font transition-all duration-300 
                ${active ? 'text-green-400' : 'text-white text-green-400'}
            `}
            style={{
                textShadow: active ? '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00' : 'none'
            }}
        >
            {/*barrinha/underline do menu sções*/}
            {children}
            <div className={`
                absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 transition-all duration-300
                ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
            `}></div>
        </button>
    );
}

// Componentes das seções
function Home(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-xs font-bold text-green-400 mb-4 terminal-glow"
            >
                &gt; BEM-VINDE AO MUSEU DIGITAL_
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>
            <Carrossel/>
            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                Explore a evolução da tecnologia através do tempo
            </p>
        </div>
    );
}

function Eletronicos(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-xs font-bold text-green-400 mb-6 terminal-glow"
            >
                &gt; ELETRÔNICOS 3D
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>
            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                Visualizações interativas dos aparelhos eletrônicos
            </p>
        </div>
    );
}

function Sobre(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-sm font-bold text-green-400 mb-4 terminal-font terminal-glow"
            >
                &gt; SOBRE O MUSEU QUINQUILHARIAS.TECH
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>

            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                Um espaço digital dedicado à preservação da história tecnológica
            </p>
        </div>
    );
}

function TecnologiasBrasileiras(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-xs font-bold text-green-400 mb-4 terminal-glow">
                &gt; TECNOLOGIAS BRASILEIRAS_
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>
            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                CRTL-Z em inovações digitais 100% nacionais
            </p>
            <TechBRs/>
        </div>
    );
}

export default MenuBar;