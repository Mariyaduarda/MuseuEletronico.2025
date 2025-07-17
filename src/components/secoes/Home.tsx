import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Cpu } from 'lucide-react';
import '@/App.css'

const Carrossel = () => {

    const slides = [
        {
            id: 1,
            title: "PATINHO FEIO",
            subtitle: "1972 - ESCOLA POLITÉCNICA/USP",
            description: "Primeiro minicomputador desenvolvido no Brasil",
            details: "Processador de 8 bits • Memória de 4KB • Linguagem própria",
            categoria: "PATINHO FEIO",
            icon: <Cpu size={24} className="text-green-400" />,
            color: "from-green-400/20 to-green-600/10"
        },
        {
            id: 2,
            title: "PATINHO FEIO",
            subtitle: "1972 - ESCOLA POLITÉCNICA/USP",
            description: "Primeiro minicomputador desenvolvido no Brasil",
            details: "Processador de 8 bits • Memória de 4KB • Linguagem própria",
            categoria: "PATINHO FEIO",
            icon: <Cpu size={24} className="text-green-400" />,
            color: "from-green-400/20 to-green-600/10"
        },
        {
            id: 3,
            title: "PATINHO FEIO",
            subtitle: "1972 - ESCOLA POLITÉCNICA/USP",
            description: "Primeiro minicomputador desenvolvido no Brasil",
            details: "Processador de 8 bits • Memória de 4KB • Linguagem própria",
            categoria: "PATINHO FEIO",
            icon: <Cpu size={24} className="text-green-400" />,
            color: "from-green-400/20 to-green-600/10"
        }
    ];

    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(prev => prev + 1);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(prev => prev - 1);
    };

    useEffect(() => {
        if (!isTransitioning) return;
        const timeout = setTimeout(() => {
            setIsTransitioning(false);
            if (currentSlide === extendedSlides.length - 1) setCurrentSlide(1);
            else if (currentSlide === 0) setCurrentSlide(slides.length);
        }, 400);
        return () => clearTimeout(timeout);
    }, [currentSlide, isTransitioning]);

    const goToSlide = (index: number) => {
        if (isTransitioning) return;
        setCurrentSlide(index + 1);
    };

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const getRealSlideIndex = () => {
        if (currentSlide === 0) return slides.length - 1;
        if (currentSlide === extendedSlides.length - 1) return 0;
        return currentSlide - 1;
    };

    return (
        <>
            <div

                className="relative w-full max-w-4xl mx-auto carousel-container rounded-lg overflow-hidden terminal-font">
                {/* carrossel movimentando */}
                <div
                    className="bg-gray-100 bg-zinc-800 relative h-60 overflow-hidden">
                    <div
                        className={`flex h-full ${isTransitioning ? 'transition-transform duration-400 ease-in-out' : ''}`}
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {extendedSlides.map((slide, index) => (
                            <div
                                key={`${slide.id}-${index}`}
                                className={`w-full h-full flex-shrink-0 slide-content bg-gradient-to-br ${slide.color} flex items-center justify-center text-white relative`}
                            >
                                {/* efeito scalines */}
                                <div className="absolute inset-0 pointer-events-none opacity-10">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-full h-0.5 bg-green-400 mb-4"
                                            style={{ opacity: Math.random() * 0.5 + 0.1 }}
                                        />
                                    ))}
                                </div>

                                <div className="text-center px-8 z-10 relative">
                                    <div className="flex justify-center mb-4">
                                        {slide.icon}
                                    </div>

                                    <h2 className="text-2xl font-bold mb-2 text-green-400 terminal-glow">
                                        &gt; {slide.title}_
                                    </h2>

                                    <p className="text-sm text-gray-300 mb-3 terminal-font">
                                        {slide.subtitle}
                                    </p>

                                    <p className="text-base text-white mb-4 terminal-font">
                                        {slide.description}
                                    </p>

                                    <div className="text-xs text-green-400 terminal-font border-l-2 border-green-400/50 pl-3">
                                        {slide.details}
                                    </div>
                                </div>

                                {/* visualmente parece uma camera - laterais 90º */}
                                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-400/50"></div>
                                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/50"></div>
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/50"></div>
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-400/50"></div>
                            </div>
                        ))}
                    </div>

                    {/* botões de controle no carrossel - esq e dir */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 control-btn text-green-400 p-2 rounded-full terminal-font"
                        title="Anterior"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 control-btn text-green-400 p-2 rounded-full terminal-font"
                        title="Próximo"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute top-3 right-3 control-btn text-green-400 p-2 rounded-full terminal-font"
                        title={isPlaying ? "Pausar" : "Reproduzir"}
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                </div>

                {/* indicadores */}
                <div
                    style={{backgroundColor: '#0f0f0f'}}
                    className="flex justify-center gap-3 py-3 border-t border-green-400/20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`indicator rounded-full ${
                                getRealSlideIndex() === index ? 'active' : ''
                            }`}
                            title={`Slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* count o estado atual do carrossel de 1 a 3 */}
                <div className="status-bar px-4 py-2 text-xs text-gray-400 flex justify-between items-center terminal-font">
                    <div className="flex items-center space-x-4">
                        <span className="text-green-400">
                            &gt; {getRealSlideIndex() + 1}/{slides.length}
                        </span>
                        <span className="text-gray-500">|</span>
                        <span>QUINQUILHARIAS.TECH</span>
                    </div>

                    {/* aviso de play e pause no carrossel*/}
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                        <span>{isPlaying ? 'PLAY' : 'PAUSADO'}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carrossel;