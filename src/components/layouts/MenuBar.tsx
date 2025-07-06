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
    // estado da secao atual
    const [secaoAtual, setSecaoAtual] = useState<Secao>("home");
    // mostra o crt no q ta selecionado agora
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
                    
                    {/* muda o tamanho do padding dependendo do tamanho da tela:
                        "sm:p-6" usa p6 quando tela for "small" e etc */}
                    <nav className="relative p-4 sm:p-6 md:p-8 lg:p-10">
                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-8 justify-center text-xs">
                            {/* chama o componente logo - quinquilharias.tech + clock*/}
                            <Logo />
                                <div className="flex flex-wrap justify-center gap-4 sm:gap-8">

                                {/* vai mudar de cor de acordo com a seção selecionada, tendo um underline*/}
                                
                                {/* Home */}
                                <NavButton
                                    active={secaoAtual === "home"}
                                    onClick={() => setSecaoAtual("home")}
                                >
                                    {/* so mostra o nome inteiro se tiver espaço suficiente*/}
                                    <span className="block md:block lg:hidden text-2xl">[H]</span>
                                    <span className="hidden lg:block lg:text-lg">Home</span>
                                </NavButton>

                                {/* Eletronicos 3d */}
                                <NavButton
                                    active={secaoAtual === "eletronico"}
                                    onClick={() => setSecaoAtual("eletronico")}
                                >
                                    
                                    {/* so mostra o nome inteiro se tiver espaço suficiente*/}
                                    <span className="block md:block lg:hidden text-2xl">[3D]</span>
                                    <span className="hidden lg:block lg:text-lg">Eletrônicos 3D</span>
                                </NavButton>

                                {/* Sobre */}
                                <NavButton
                                    active={secaoAtual === "sobre"}
                                    onClick={() => setSecaoAtual("sobre")}
                                >
                                    
                                    {/* so mostra o nome inteiro se tiver espaço suficiente*/}
                                    <span className="block md:block lg:hidden text-2xl">[i]</span>
                                    <span className="hidden lg:block lg:text-lg">Sobre</span>
                                </NavButton>

                                {/* Tecnologia BR */}
                                <NavButton
                                    active={secaoAtual === "tecnologias-brasileiras"}
                                    onClick={() => setSecaoAtual("tecnologias-brasileiras")}
                                >
                                    
                                    {/* so mostra o nome inteiro se tiver espaço suficiente*/}
                                    <span className="block md:block lg:hidden text-2xl">[BR]</span>
                                    <span className="hidden lg:block lg:text-lg">Techs Brasileiras</span>
                                </NavButton>
                            </div>
                        </div>
                    </nav>

                    {/* add borda dps do menu*/}
                    <main className="p-6 border-white">
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
            {/* Titulo */}
            <h1 className="text-sm font-bold text-green-400 mb-4 terminal-font terminal-glow">
                &gt; BEM-VINDE AO MUSEU DIGITAL_
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>

            {/* carrossel de destaques */}
            <Carrossel/>

            {/* corpo em si */}
            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                Explore a evolução da tecnologia através do tempo
            </p>
        </div>
    );
}

function Eletronicos(): JSX.Element {
    return (
        <div className="text-center">
            {/* Titulo */}
            <h1 className="text-sm font-bold text-green-400 mb-4 terminal-font terminal-glow">
                &gt; ELETRÔNICOS 3D
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>
            
            {/* Subtitulo */}
            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                Visualizações interativas dos aparelhos eletrônicos
            </p>
            
            {/* corpo em si */}

        </div>
    );
}

function Sobre(): JSX.Element {
    return (
        <div className="text-center">
            {/* Titulo */}
            <h1 className="text-sm font-bold text-green-400 mb-4 terminal-font terminal-glow">
                &gt; SOBRE O MUSEU QUINQUILHARIAS.TECH
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>

            {/* Subtitulo */}
            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                Um espaço digital dedicado à preservação da história tecnológica
            </p>
            
            {/* corpo em si */}

        </div>
    );
}

function TecnologiasBrasileiras(): JSX.Element {
    return (
        <div className="text-center">
            {/* Titulo */}
            <h1 className="text-sm font-bold text-green-400 mb-4 terminal-font terminal-glow">
                &gt; TECNOLOGIAS BRASILEIRAS_
                <span className="terminal-cursor text-green-400 ml-1">█</span>
            </h1>
            
            {/* Subtitulo */}
            <p className="text-sm text-gray-300 terminal-font max-w-2xl mx-auto">
                CRTL-Z em inovações digitais 100% nacionais
            </p>
            
            {/* corpo em si */}
            <TechBRs/>
        </div>
    );
}

export default MenuBar;