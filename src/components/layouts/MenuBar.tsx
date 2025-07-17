import React, { type JSX, useState, useEffect } from "react";
import Logo from './Logo.tsx'
import Carrossel from "../secoes/Home.tsx";
import TechBRs from "../secoes/TechsBRs.tsx";
import TerminalSim from '../secoes/TerminalSim.tsx';
import './MenuBar.css';
import Footer from "./Footer.tsx";
import Electronic3D from "../secoes/Electronic3D.tsx";

// SPA = tipos para as seções disponíveis
type Secao = "home" | "eletronico" | "sobre" | "tecnologias-brasileiras" | "terminal";

// Tipos para tamanhos de fonte
type TamanhoFonte = "pequena" | "padrao" | "grande";

// Interface para props do NavButton
interface NavButtonProps {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
    temaEscuro: boolean;
}

function MenuBar(): JSX.Element {
    // estado da secao atual
    const [secaoAtual, setSecaoAtual] = useState<Secao>("home");
    // mostra o crt no q ta selecionado agora
    const [crtAtivo, setCrtAtiva] = useState<boolean>(true); // crt comeca ligado por padrao
    // estado do tema escuro ou claro
    const [temaEscuro, setTemaEscuro] = useState<boolean>(true); // tema comeca escuro por padrao
    //menu fixo e nao fixo, controle ao user
    const[menuFixo, setMenuFixo] = useState<boolean>(true);
    // controle do sidebar
    const [sidebarAberto, setSidebarAberto] = useState<boolean>(false);
    // controle do tamanho da fonte
    const [tamanhoFonte, setTamanhoFonte] = useState<TamanhoFonte>("padrao");

    // efeito pra adicionar ou remover o 'dark' do html
    useEffect(() => {
        document.documentElement.classList.toggle('dark', temaEscuro);
    }, [temaEscuro]);

    // função para obter classes CSS baseadas no tamanho da fonte
    const getClassesFonte = () => {
        switch (tamanhoFonte) {
            case "pequena":
                return {
                    base: "text-xs",
                    titulo: "text-sm",
                    navegacao: "text-base sm:text-lg lg:text-sm xl:text-base",
                    conteudo: "text-xs"
                };
            case "grande":
                return {
                    base: "text-lg",
                    titulo: "text-xl",
                    navegacao: "text-2xl sm:text-3xl lg:text-xl xl:text-2xl",
                    conteudo: "text-lg"
                };
            default: // padrao
                return {
                    base: "text-xl",
                    titulo: "text-sm",
                    navegacao: "text-xl sm:text-2xl lg:text-lg xl:text-xl",
                    conteudo: "text-sm"
                };
        }
    };

    const classesFonte = getClassesFonte();

    /* decide qual componetne  mostrar */
    const renderSecao = (): JSX.Element => {
        switch (secaoAtual) {
            case "home":
                return <Home temaEscuro={temaEscuro} classesFonte={classesFonte}/>;
            case "eletronico":
                return <Electronic3D temaEscuro={temaEscuro} classesFonte={classesFonte}/>;
            case "sobre":
                return <Sobre temaEscuro={temaEscuro} classesFonte={classesFonte}/>;
            case "tecnologias-brasileiras":
                return <TecnologiasBrasileiras temaEscuro={temaEscuro} classesFonte={classesFonte}/>;
            case "terminal":
                return <Terminal
                    crtAtivo={crtAtivo}
                    setCrtAtiva={setCrtAtiva}
                    temaEscuro={temaEscuro}
                    setTemaEscuro={setTemaEscuro}
                    classesFonte={classesFonte}
                />;
            default:
                return <Home temaEscuro={temaEscuro} classesFonte={classesFonte}/>;
        }
    };

    const proximoTamanho = () => {
        const tamanhos: TamanhoFonte[] = ["pequena", "padrao", "grande"];
        const indiceAtual = tamanhos.indexOf(tamanhoFonte);
        const proximoIndice = (indiceAtual + 1) % tamanhos.length;
        setTamanhoFonte(tamanhos[proximoIndice]);
    };

    return (
        <>
            <div
                style={{backgroundColor: temaEscuro ? '#1a1a1a' : '#f8f9fa'}}
                className={`min-h-screen ${classesFonte.base} ${temaEscuro ?' text-green-400' : 'bg-white text-black'} terminal-font ${crtAtivo ? 'crt-container' : ''}`}>
                {/* Efeitos CRT */}
                {crtAtivo && (
                    <>
                        <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
                        <div className="flicker fixed inset-0 pointer-events-none z-40"></div>
                        <div className="noise fixed inset-0 pointer-events-none z-30"></div>
                    </>
                )}

                {/* Sidebar Neon Retrátil */}
                <div className={`fixed top-0 right-0 h-full z-40 transition-all duration-500 ease-in-out ${sidebarAberto ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* Backdrop quando sidebar está aberto */}
                    {sidebarAberto && (
                        <div
                            className="fixed inset-0 bg-gray-800 sidebar-backdrop -z-10"
                            onClick={() => setSidebarAberto(false)}
                        />
                    )}

                    {/* Container do Sidebar */}
                    <div
                        className={
                        `h-full w-64 ${temaEscuro ? 'bg-gray-800' : 'bg-white'} border-l-2 ${temaEscuro ? 'border-green-400' : 'border-black'} shadow-2xl`}>
                        {/* Header do Sidebar */}
                        <div

                            className={`p-4 border-b ${temaEscuro ? 'border-green-400/30' : 'bg-white-50'}`}>
                            <h3 className={`text-lg font-bold terminal-font terminal-glow ${temaEscuro ? 'text-green-400' : 'text-gray-800'}`}>
                                &gt; CONTROLES_
                            </h3>
                        </div>

                        {/* Controles do Sidebar */}
                        <div className="p-4 space-y-4">
                            {/* Toggle CRT */}
                            <div className="space-y-2">
                                <label className={`text-sm font-medium ${temaEscuro ? 'text-green-300' : 'text-gray-800'}`}>
                                    Monitor CRT
                                </label>
                                <button
                                    onClick={() => setCrtAtiva(!crtAtivo)}
                                    className={`w-full px-4 py-2 border transition-all duration-300 text-sm terminal-font neon-glow ${
                                        temaEscuro
                                            ? 'bg-green-400/20 border-green-400 text-green-400 hover:bg-green-400/30'
                                            : ' border-gray-800 text-gray-800 hover:bg-gray-800/30'
                                    }`}
                                >
                                    CRT: {crtAtivo ? 'ON' : 'OFF'}
                                </button>
                            </div>

                            {/* Toggle Tema */}
                            <div className="space-y-2">
                                <label className={`text-sm font-medium ${temaEscuro ? 'text-green-300' : 'text-black-600'}`}>
                                    Tema Visual
                                </label>
                                <button
                                    onClick={() => setTemaEscuro(!temaEscuro)}
                                    className={`w-full px-4 py-2 border transition-all duration-300 text-sm terminal-font neon-glow ${
                                        temaEscuro
                                            ? 'bg-green-400/20 border-green-400 text-green-400 hover:bg-green-400/30'
                                            : 'bg-gray-800/20 border-black-500 text-black-500 hover:bg-gray-800/30'
                                    }`}
                                >
                                    <span className={`mr-2 ${temaEscuro ? 'text-white' : 'text-gray-700'}`}>
                                        {temaEscuro ? '◐' : '◑'}
                                    </span>
                                    {temaEscuro ? 'DARK' : 'LIGHT'}
                                </button>
                            </div>

                            {/* Controle de Tamanho de Fonte */}
                            <div className="space-y-2">
                                <label className={`text-sm font-medium ${temaEscuro ? 'text-green-300' : 'text-black-600'}`}>
                                    Tamanho da Fonte
                                </label>
                                <button
                                    onClick={proximoTamanho}
                                    className={`w-full px-4 py-2 border transition-all duration-300 text-sm terminal-font neon-glow ${
                                        temaEscuro
                                            ? 'bg-green-400/20 border-green-400 text-green-400 hover:bg-green-400/30'
                                            : 'bg-gray-800/20 border-black-500 text-black-500 hover:bg-gray-800/30'
                                    }`}
                                >
                                    <span className={`mr-2 ${temaEscuro ? 'text-white' : 'text-gray-700'}`}>
                                        {tamanhoFonte === 'pequena' ? 'Aa' : tamanhoFonte === 'padrao' ? 'Aa' : 'Aa'}
                                    </span>
                                    : {tamanhoFonte.toUpperCase()}
                                </button>
                            </div>

                            {/* Toggle Menu Fixo */}
                            <div className="space-y-2">
                                <label className={`text-sm font-medium ${temaEscuro ? 'text-green-300' : 'text-black-600'}`}>
                                    Menu de Navegação
                                </label>
                                <button
                                    onClick={() => setMenuFixo(!menuFixo)}
                                    className={`w-full px-4 py-2 border transition-all duration-300 text-sm terminal-font neon-glow ${
                                        temaEscuro
                                            ? 'bg-green-400/20 border-green-400 text-green-400 hover:bg-green-400/30'
                                            : 'bg-gray-800/20 border-black-500 text-black-500 hover:bg-gray-800/30'
                                    }`}
                                >
                                    MENU: {menuFixo ? 'FIXO' : 'SCROLL'}
                                </button>
                            </div>

                            {/* Separator */}
                            <div className={`h-px ${temaEscuro ? 'bg-green-400/30' : 'bg-gray-800/30'}`}></div>

                            {/* Info */}
                            <div className="text-xs text-gray-500 terminal-font">
                                <p>quinquilharias.tech</p>
                                <p>Museu Digital v1.0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Setinha Neon para abrir/fechar sidebar - Nova versão mais bonita */}
                <button
                    onClick={() => setSidebarAberto(!sidebarAberto)}
                    className={`sidebar-arrow fixed top-1/2 right-0 transform -translate-y-1/2 z-50 ${
                        temaEscuro ? 'bg-green-400/10 border-green-400 text-green-400' : 'bg-gray-800/10 border-black-500 text-black-500'
                    } border-2 rounded-l-lg shadow-lg backdrop-blur-sm`}
                    style={{
                        width: '48px',
                        height: '80px',
                        borderRadius: '12px 0 0 12px',
                        boxShadow: temaEscuro
                            ? '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1)'
                            : '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
                        borderRight: 'none'
                    }}
                >
                    <div className="flex items-center justify-center h-full">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${sidebarAberto ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </div>
                </button>

                <div className={`${crtAtivo ? 'screen-curve' : ''} min-h-screen`}>
                    {/* menu de navegação entre seções */}
                    <nav className={`${menuFixo ? 'fixed' : 'relative'} top-0 left-0 right-0 w-full z-20 p-2 sm:p-4 md:p-6 lg:p-8 border-b-2 ${temaEscuro ? 'border-green-400' : 'border-black-500'} ${temaEscuro ? 'bg-black' : 'bg-white/95'} backdrop-blur-sm`}>
                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-4 sm:gap-8 justify-center">
                            {/* chama o componente logo - quinquilharias.tech + clock*/}
                            <Logo />
                            <div className={`flex flex-wrap justify-center gap-4 sm:gap-8 ${classesFonte.navegacao}`}>
                                {/* Home */}
                                <NavButton
                                    active={secaoAtual === "home"}
                                    onClick={() => setSecaoAtual("home")}
                                    temaEscuro={temaEscuro}
                                >
                                    <span className="inline lg:hidden">[HM]</span>
                                    <span className="hidden lg:inline">Home</span>
                                </NavButton>

                                {/* Eletronicos 3d */}
                                <NavButton
                                    active={secaoAtual === "eletronico"}
                                    onClick={() => setSecaoAtual("eletronico")}
                                    temaEscuro={temaEscuro}
                                >
                                    <span className="inline lg:hidden">[3D]</span>
                                    <span className="hidden lg:inline">Eletrônicos 3D</span>
                                </NavButton>

                                {/* Sobre */}
                                <NavButton
                                    active={secaoAtual === "sobre"}
                                    onClick={() => setSecaoAtual("sobre")}
                                    temaEscuro={temaEscuro}
                                >
                                    <span className="inline lg:hidden">[SB]</span>
                                    <span className="hidden lg:inline">Sobre</span>
                                </NavButton>

                                {/* Tecnologia BR */}
                                <NavButton
                                    active={secaoAtual === "tecnologias-brasileiras"}
                                    onClick={() => setSecaoAtual("tecnologias-brasileiras")}
                                    temaEscuro={temaEscuro}
                                >
                                    <span className="inline lg:hidden">[BR]</span>
                                    <span className="hidden lg:inline">Techs Brasileiras</span>
                                </NavButton>

                                {/* Terminal */}
                                <NavButton
                                    active={secaoAtual === "terminal"}
                                    onClick={() => setSecaoAtual("terminal")}
                                    temaEscuro={temaEscuro}
                                >
                                    <span className="inline lg:hidden">[TR]</span>
                                    <span className="hidden lg:inline">Terminal</span>
                                </NavButton>
                            </div>
                        </div>
                    </nav>

                    {/* Main content - ajusta padding baseado no menu fixo */}
                    <main className={`p-6 ${menuFixo ? 'pt-32 sm:pt-36 md:pt-40 lg:pt-44' : 'pt-6'}`}>
                        {renderSecao()}
                    </main>
                </div>
            </div>
        </>
    );
}

// componente NavButton
function NavButton({ children, active, onClick, temaEscuro }: NavButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={`
                relative px-0.1 py-2 terminal-font transition-all duration-300 
                ${active
                ? (temaEscuro ? 'text-green-400' : 'text-black-500')
                : (temaEscuro ? 'text-white' : 'text-gray-600 hover:text-gray-800')
            }
            `}
            style={{
                textShadow: active
                    ? (temaEscuro ? '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00' : '0 0 5px #3b82f6, 0 0 10px #3b82f6')
                    : 'none'
            }}
        >
            {children}
            <div className={`
                absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300
                ${active
                ? (temaEscuro ? 'bg-green-400 opacity-100 scale-x-100' : 'bg-gray-800 opacity-100 scale-x-100')
                : 'opacity-0 scale-x-0'
            }
            `}></div>
        </button>
    );
}

// Componentes das seções - adicionando prop classesFonte
interface SecaoProps {
    temaEscuro: boolean;
    classesFonte: {
        base: string;
        titulo: string;
        navegacao: string;
        conteudo: string;
    };
}

function Home({ temaEscuro, classesFonte }: SecaoProps): JSX.Element {
    return (
        <div className="text-center">
            <h1 className={`${classesFonte.titulo} font-bold mb-4 terminal-font terminal-glow ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>
                &gt; BEM-VINDE AO MUSEU DIGITAL_
                <span className={`terminal-cursor ml-1 ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>█</span>
            </h1>
            <Carrossel/>
            <p className={`${classesFonte.conteudo} terminal-font max-w-2xl mx-auto ${temaEscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                Explore a evolução da tecnologia através do tempo
            </p>
        </div>
    );
}

function Electronics3DViewer({ temaEscuro, classesFonte }: SecaoProps): JSX.Element {
    return (
        <div className="text-center">
            <h1 className={`${classesFonte.titulo} font-bold mb-4 terminal-font terminal-glow ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>
                &gt; ELETRÔNICOS 3D
                <span className={`terminal-cursor ml-1 ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>█</span>
            </h1>
            <p className={`${classesFonte.conteudo} terminal-font max-w-2xl mx-auto ${temaEscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                Visualizações interativas dos aparelhos eletrônicos
            </p>
        </div>
    );
}

function Sobre({ temaEscuro, classesFonte }: SecaoProps): JSX.Element {
    return (
        <div className="text-center">
            <h1 className={`${classesFonte.titulo} font-bold mb-4 terminal-font terminal-glow ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>
                &gt; SOBRE O MUSEU QUINQUILHARIAS.TECH
                <span className={`terminal-cursor ml-1 ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>█</span>
            </h1>
            <p className={`${classesFonte.conteudo} terminal-font max-w-2xl mx-auto ${temaEscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                Um espaço digital dedicado à preservação da história tecnológica
            </p>
        </div>
    );
}

function TecnologiasBrasileiras({ temaEscuro, classesFonte }: SecaoProps): JSX.Element {
    return (
        <div className="text-center">
            <h1 className={`${classesFonte.titulo} font-bold mb-4 terminal-font terminal-glow ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>
                &gt; TECNOLOGIAS BRASILEIRAS_
                <span className={`terminal-cursor ml-1 ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>█</span>
            </h1>
            <p className={`${classesFonte.conteudo} terminal-font max-w-2xl mx-auto ${temaEscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                CTRL-Z em inovações digitais 100% nacionais
            </p>
            <TechBRs/>
        </div>
    );
}

interface TerminalProps {
    crtAtivo: boolean;
    setCrtAtiva: React.Dispatch<React.SetStateAction<boolean>>;
    temaEscuro: boolean;
    setTemaEscuro: React.Dispatch<React.SetStateAction<boolean>>;
    classesFonte: {
        base: string;
        titulo: string;
        navegacao: string;
        conteudo: string;
    };
}

function Terminal({ crtAtivo, setCrtAtiva, temaEscuro, setTemaEscuro, classesFonte }: TerminalProps): JSX.Element {
    return (
        <div className="text-center">
            <h1 className={`${classesFonte.titulo} font-bold mb-4 terminal-font terminal-glow ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>
                &gt; TERMINAL_
                <span className={`terminal-cursor ml-1 ${temaEscuro ? 'text-green-400' : 'text-black-500'}`}>█</span>
            </h1>
            <p className={`${classesFonte.conteudo} terminal-font max-w-2xl mx-auto ${temaEscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                Simulador de um Terminal
            </p>
            <TerminalSim
                crtAtivo={crtAtivo}
                setCrtAtiva={setCrtAtiva}
                temaEscuro={temaEscuro}
                setTemaEscuro={setTemaEscuro}
            />
            <Footer temaEscuro={temaEscuro} />
        </div>
    );
}

export default MenuBar;