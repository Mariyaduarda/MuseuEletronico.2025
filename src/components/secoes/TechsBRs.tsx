import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronRight } from 'lucide-react';
import '@/App.css'

interface TecnologiaItem {
    id: string;
    nome: string;
    periodo: string;
    descricao: string;
    detalhes: string[];
    categoria: string;
    icon: React.ReactNode;
}

{/* amostra dos cards das inovacoes techs */}
const tecnologias: TecnologiaItem[] = [
    {
        id: 'computacao',
        nome: 'Computação Pioneira',
        periodo: 'Séc. XX',
        descricao: 'Primeiros computadores desenvolvidos inteiramente no Brasil',
        detalhes: [
            'ZEZINHO (1961) - primeiro computador construído no Brasil pela USP',
            'PATINHO FEIO (1972) - minicomputador da Escola Politécnica/USP',
            'G-10 (1973) - computador desenvolvido pela Cobra Computadores',
            'Sistemas bancários automatizados brasileiros pioneiros'
        ],
        categoria: '',
        icon: <Cpu size={16} className="text-cyan-400" />
    },
    {
        id: 'software',
        nome: 'Software Nacional',
        periodo: 'Séc. XX-XXI',
        descricao: 'Desenvolvimento de softwares e sistemas brasileiros',
        detalhes: [
            'Linguagem de programação Lua (1993) - PUC-Rio',
            'Sistema operacional Conectiva Linux (1995)',
            'ERP Microsiga/TOTVS - líder nacional em gestão empresarial',
            'Compilador GCC-Brasil para processadores nacionais'
        ],
        categoria: '',
        icon: <Cpu size={16} className="text-cyan-400" />
    },
    {
        id: 'internet',
        nome: 'Internet Brasileira',
        periodo: 'Séc. XX-XXI',
        descricao: 'Pioneirismo na internet e tecnologias web no Brasil',
        detalhes: [
            'RNP (1989) - primeira rede internet acadêmica do país',
            'Registro.br - sistema de domínios .br desenvolvido pela FAPESP',
            'IX.br - pontos de troca de tráfego internet nacionais',
            'Projeto Software Livre Brasil - incentivo ao código aberto'
        ],
        categoria: '',
        icon: <Cpu size={16} className="text-cyan-400" />
    },
    {
        id: 'games',
        nome: 'Indústria de Games',
        periodo: 'Séc. XXI',
        descricao: 'Desenvolvimento de jogos digitais brasileiros',
        detalhes: [
            'Tectoy - adaptação do Master System para o mercado brasileiro',
            'Horizon Chase - jogo de corrida brasileiro premiado mundialmente',
            'Célula de jogos no CESAR - centro de inovação em Recife',
            'Unity Brasil - hub de desenvolvimento de games mobile'
        ],
        categoria: '',
        icon: <Cpu size={16} className="text-cyan-400" />
    },
    {
        id: 'ia',
        nome: 'Inteligência Artificial',
        periodo: 'Séc. XXI',
        descricao: 'Pesquisa e desenvolvimento em IA no Brasil',
        detalhes: [
            'Laboratório de IA da USP - pesquisas em machine learning',
            'Centro de IA do CESAR - aplicações em saúde e agronegócio',
            'Startups de IA como Neoway, Sensedia e ENACOM',
            'Plataforma de IA da Embrapa para agricultura de precisão'
        ],
        categoria: '',
        icon: <Cpu size={16} className="text-cyan-400" />
    }
];

function TechBRs() {
    const [expandido, setExpandido] = useState<string | null>(null);
    const [filtroAtivo, setFiltroAtivo] = useState<string>('todos');

    const toggleExpand = (id: string) => {
        setExpandido(expandido === id ? null : id);
    };

    const periodos = ['todos', 'XX', 'XX-XXI'];

    const tecnologiasFiltradas = tecnologias.filter(tech => {
        if (filtroAtivo === 'todos') return true;
        return tech.periodo.includes(filtroAtivo);
    });

    return (
        <div className="min-h-screen bg-black text-white terminal-font">
            <div className="container mx-auto px-6 py-8">
                {/* filtros por época */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <span className="text-green-400 text-xs">FILTRAR POR PERÍODO:</span>
                    {periodos.map(periodo => (
                        <button
                            key={periodo}
                            onClick={() => setFiltroAtivo(periodo)}
                            className={`filter-btn px-3 py-1 text-xs rounded terminal-font ${
                                filtroAtivo === periodo ? 'active text-green-400' : 'text-gray-300'
                            }`}
                        >
                            {periodo === 'todos' ? 'TODOS' : `SÉC ${periodo}`}
                        </button>
                    ))}
                </div>

                {/* timeline visual bonita */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-8">
                        {['XX', 'XXI'].map((seculo) => (
                            <div key={seculo} className="flex flex-col items-center">
                                <div className="timeline-dot"></div>
                                <span className="text-xs text-green-400 mt-2">SÉC {seculo}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* cards de techbrs */}
                <div className="grid gap-4 max-w-4xl mx-auto">
                    {tecnologiasFiltradas.map((tech) => (
                        <div key={tech.id} className="tech-card rounded-xs compact-card">
                            <div
                                className="compact-content cursor-pointer"
                                onClick={() => toggleExpand(tech.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    {tech.icon}
                                    <div>
                                        <h3 className="text-sm font-semibold text-green-400">
                                            {tech.nome}
                                        </h3>
                                        <span className="text-xs text-gray-400 terminal-font">
                                            {tech.periodo}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-400">
                                        {expandido === tech.id ? 'DESVER' : 'VER'}
                                    </span>
                                    {expandido === tech.id ? (
                                        <ChevronDown size={14} className="text-green-400" />
                                    ) : (
                                        <ChevronRight size={14} className="text-green-400" />
                                    )}
                                </div>
                            </div>

                            <p className="text-xs text-gray-300 mt-2 px-6">{tech.descricao}</p>

                            {expandido === tech.id && (
                                <div className="mt-4 space-y-2 px-6 pb-4">
                                    <div className="text-xs text-green-400 font-semibold">
                                        &gt; DETALHES TÉCNICOS:
                                    </div>
                                    {tech.detalhes.map((detalhe, index) => (
                                        <div key={index} className="tech-detail pl-3 py-1 rounded text-xs">
                                            <span className="text-green-400 mr-2">•</span>
                                            <span className="text-gray-300">{detalhe}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* footer para verificar se carrega tds as techs */}
                <div className="text-center mt-12 pt-6 border-t border-gray-700">
                    <p className="text-xs text-gray-500 terminal-font">
                        &gt; VALORIZE AS TECHS BRS_
                    </p>
                    <p className="text-xs text-green-400 mt-2">
                        {/* me diz qnts techs chegaram*/}
                        {tecnologiasFiltradas.length} TECNOLOGIAS DIGITAIS CARREGADAS
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TechBRs;