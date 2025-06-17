// é um estado que decide qual seção está ativa
import { useState } from "react";

// Tipos para as seções disponíveis
type Secao = "home" | "eletronico" | "sobre" | "tecnologias-brasileiras";

// Interface para props do NavButton
interface NavButtonProps {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
}

function App(): JSX.Element {
    const [secaoAtual, setSecaoAtual] = useState<Secao>("home");

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
        <div className="min-h-screen bg-black text-white">
            {/* menu de navegacao gradiente */}
            <nav className="relative p-6">
                <div className="absolute inset-0 animated-gradiente-bg opacity-20"></div>
                <div className="relative z-10 flex flex-wrap gap-8 justify-center">
                    <NavButton
                        active={secaoAtual === "home"}
                        onClick={() => setSecaoAtual("home")}
                    >
                        Home
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

            <main className="p-6">
                {renderSecao()}
            </main>

            <style jsx>{`
                .font-vt323 {
                    font-family: 'VT323', monospace;
                    font-size: 1.2em; /* VT323 fica pequena, precisa aumentar */
                }

                .animated-gradiente-bg {
                    background: linear-gradient(
                            45deg,
                            #00ff00, /* verde neon classico */
                            #00ff41, /* verde neon com azul */
                            #39ff14, /* verde lima neon */
                            #00ff7f, /* verde primavera eletrica */
                            #00ffff  /* ciano neon */
                    );
                    background-size: 400% 400%;
                    animation: gradiente-flow 8s ease infinite;
                }

                @keyframes gradiente-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .nav-gradiente-text {
                    background: linear-gradient(
                            45deg,
                            #00ff00, /* verde neon classico */
                            #00ff41, /* verde neon com azul */
                            #39ff14, /* verde lima neon */
                            #00ff7f, /* verde primavera eletrica */
                            #00ffff  /* ciano neon */
                    );
                    background-size: 300% 300%;
                    animation: gradiente-flow 4s ease infinite;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hover-neon-green:hover {
                    color: #39ff14; /* verde neon */
                    text-shadow:
                            0 0 20px #ffffff,
                            0 0 40px #ffffff;
                    transition: color 0.3s ease;
                }
            `}</style>
        </div>
    );
}

// componente navbutton
function NavButton({ children, active, onClick }: NavButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={`
                relative px-4 py-3 font-semibold text-lg transition-all duration-300
                ${active
                ? 'text-white' // fica texto branco ao clicar na seção
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

// Componentes das seções (básicos para exemplo)
function Home(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-green-400 mb-4">
            </h1>
            <p className="text-xl text-gray-300">
            </p>
        </div>
    );
}

function Eletronicos(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-green-400 mb-4">
            </h1>
            <p className="text-xl text-gray-300">
                Visualizações interativas dos aparelhos eletrônicos
            </p>
        </div>
    );
}

function Sobre(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-green-400 mb-4">
                Sobre o Museu
            </h1>
            <p className="text-xl text-gray-300">

            </p>
        </div>
    );
}

function TecnologiasBrasileiras(): JSX.Element {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-green-400 mb-4">
                Tecnologias Brasileiras
            </h1>
            <p className="text-xl text-gray-300">
                CTRL-Z na história das tecnológicas desenvolvidas no Brasil.
            </p>
        </div>
    );
}

export default App;