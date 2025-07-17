import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Cpu, Monitor, Smartphone, Gamepad2, Radio, Clock, Terminal, RotateCcw, ZoomIn, Eye } from 'lucide-react';
import * as THREE from 'three';

interface ElectronicItem {
    id: number;
    name: string;
    year: number;
    category: string;
    description: string;
    significance: string;
    image: string;
    icon: React.ReactNode;
    facts: string[];
    color: string;
    geometry: string;
}

const electronicsData: ElectronicItem[] = [
    {
        id: 1,
        name: "ENIAC",
        year: 1946,
        category: "Computadores",
        description: "O primeiro computador eletrônico de propósito geral do mundo",
        significance: "Revolucionou a computação e abriu caminho para a era digital",
        image: "🖥️",
        icon: <Cpu className="w-6 h-6" />,
        color: "#00ff88",
        geometry: "box",
        facts: [
            "Pesava 30 toneladas",
            "Ocupava uma sala inteira",
            "Consumia 150kW de energia",
            "Realizava 5.000 operações por segundo"
        ]
    },
    {
        id: 2,
        name: "Transistor",
        year: 1947,
        category: "Componentes",
        description: "Dispositivo semicondutor que revolucionou a eletrônica",
        significance: "Base de toda eletrônica moderna, substituindo válvulas",
        image: "⚡",
        icon: <Radio className="w-6 h-6" />,
        color: "#00ffff",
        geometry: "cylinder",
        facts: [
            "Inventado nos Laboratórios Bell",
            "Rendeu Nobel de Física em 1956",
            "Permitiu miniaturização de circuitos",
            "Base dos microprocessadores"
        ]
    },
    {
        id: 3,
        name: "Apple II",
        year: 1977,
        category: "Computadores",
        description: "Um dos primeiros computadores pessoais de sucesso comercial",
        significance: "Democratizou o acesso aos computadores pessoais",
        image: "💻",
        icon: <Monitor className="w-6 h-6" />,
        color: "#88ff00",
        geometry: "box",
        facts: [
            "Vendeu mais de 6 milhões de unidades",
            "Primeiro computador com display colorido",
            "Interface gráfica revolucionária",
            "Criou o mercado de software"
        ]
    },
    {
        id: 4,
        name: "Game Boy",
        year: 1989,
        category: "Videogames",
        description: "Console portátil que revolucionou os jogos móveis",
        significance: "Estabeleceu o mercado de jogos portáteis",
        image: "🎮",
        icon: <Gamepad2 className="w-6 h-6" />,
        color: "#ffff00",
        geometry: "box",
        facts: [
            "Vendeu 118 milhões de unidades",
            "Bateria durava 30 horas",
            "Tela monocromática icônica",
            "Tetris foi o jogo mais vendido"
        ]
    },
    {
        id: 5,
        name: "iPhone",
        year: 2007,
        category: "Smartphones",
        description: "Smartphone que redefiniu a telefonia móvel",
        significance: "Criou a era dos smartphones modernos",
        image: "📱",
        icon: <Smartphone className="w-6 h-6" />,
        color: "#ff0088",
        geometry: "box",
        facts: [
            "Interface multi-touch revolucionária",
            "App Store mudou a distribuição de software",
            "Combinou telefone, iPod e internet",
            "Vendeu 6 milhões no primeiro ano"
        ]
    }
];

const categories = ["Todos", "Computadores", "Componentes", "Videogames", "Smartphones"];

// 3D Viewer Component
const ThreeViewer = ({ item, onClose }: { item: ElectronicItem; onClose: () => void }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const meshRef = useRef<THREE.Mesh>();
    const frameRef = useRef<number>();

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);

        // Geometry based on item type
        let geometry: THREE.BufferGeometry;
        switch (item.geometry) {
            case 'cylinder':
                geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(1, 32, 32);
                break;
            default:
                geometry = new THREE.BoxGeometry(2, 1.5, 0.5);
        }

        // Material with neon glow effect
        const material = new THREE.MeshPhongMaterial({
            color: item.color,
            emissive: item.color,
            emissiveIntensity: 0.2,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        scene.add(mesh);
        meshRef.current = mesh;

        // Wireframe overlay for retro effect
        const wireframe = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: item.color,
            transparent: true,
            opacity: 0.3
        });
        const wireframeMesh = new THREE.LineSegments(wireframe, wireframeMaterial);
        scene.add(wireframeMesh);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(item.color, 1, 100);
        pointLight.position.set(5, 5, 5);
        pointLight.castShadow = true;
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x00ff00, 0.5, 100);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        // Add grid helper for retro computer aesthetic
        const gridHelper = new THREE.GridHelper(10, 20, 0x00ff00, 0x00ff00);
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Animation loop
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);

            if (meshRef.current) {
                meshRef.current.rotation.x += 0.005;
                meshRef.current.rotation.y += 0.01;
                wireframeMesh.rotation.x += 0.005;
                wireframeMesh.rotation.y += 0.01;
            }

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            wireframeMaterial.dispose();
            renderer.dispose();
        };
    }, [item]);

    return (
        <div className="fixed inset-0 bg-gray-800/95 z-50 flex">
            {/* 3D Viewer */}
            <div className="flex-1 relative">
                <div ref={mountRef} className="w-full h-full" />

                {/* 3D Controls */}
                <div className="absolute top-4 left-4 space-y-2">
                    <button className="w-12 h-12 bbg-gray-800 border-2 border-green-400 text-green-400 flex items-center justify-center hover:bg-green-400/20 transition-colors">
                        <RotateCcw className="w-6 h-6" />
                    </button>
                    <button className="w-12 h-12 bg-gray-800 border-2 border-green-400 text-green-400 flex items-center justify-center hover:bg-green-400/20 transition-colors">
                        <ZoomIn className="w-6 h-6" />
                    </button>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-12 h-12 bg-gray-800 border-2 border-green-400 text-green-400 flex items-center justify-center hover:bg-green-400/20 transition-colors font-mono text-xl"
                >
                    X
                </button>
            </div>

            {/* Info Panel */}
            <div className="w-96 bg-gray-800 border-l-2 border-green-400 p-6 overflow-y-auto">
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-800 border-2 border-green-400 flex items-center justify-center text-green-400">
                            {item.icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-green-400 font-mono tracking-wider terminal-glow">
                                {item.name.toUpperCase()}
                            </h2>
                            <p className="text-green-300 font-mono">ANO: {item.year}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2 font-mono">
                            [DESCRIÇÃO]
                        </h3>
                        <p className="text-green-300 font-mono leading-relaxed text-sm">
                            {item.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2 font-mono">
                            [IMPORTÂNCIA HISTÓRICA]
                        </h3>
                        <p className="text-green-300 font-mono leading-relaxed text-sm">
                            {item.significance}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-3 font-mono">
                            [DADOS TÉCNICOS]
                        </h3>
                        <div className="space-y-2">
                            {item.facts.map((fact, index) => (
                                <div key={index} className="bg-green-400/10 border border-green-600 p-3">
                                    <p className="text-green-300 font-mono text-sm">
                                         {fact}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function QuinquilhariasTech3D() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedItem, setSelectedItem] = useState<ElectronicItem | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [terminalText, setTerminalText] = useState("");
    const [scanLine, setScanLine] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const text = "INICIALIZANDO SISTEMA 3D... MODELOS CARREGADOS";
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                setTerminalText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
        return () => clearInterval(typeWriter);
    }, []);

    useEffect(() => {
        const scanLineAnimation = setInterval(() => {
            setScanLine(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(scanLineAnimation);
    }, []);

    const filteredItems = selectedCategory === "Todos"
        ? electronicsData
        : electronicsData.filter(item => item.category === selectedCategory);

    const handleItemClick = (item: ElectronicItem) => {
        setSelectedItem(item);
    };

    const closeViewer = () => {
        setSelectedItem(null);
    };

    return (
        <div className="min-h-screen relative overflow-hidden" style={{
            background: 'radial-gradient(ellipse at center, #001a00 0%, #000000 100%)',
            fontFamily: '"Courier New", monospace'
        }}>
            {/* CRT Effects */}
            <div
                className="fixed inset-0 pointer-events-none z-30 opacity-30"
                style={{
                    background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          )`
                }}
            />

            <div
                className="fixed w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-20 pointer-events-none z-20"
                style={{
                    top: `${scanLine}%`,
                    transition: 'top 0.05s linear',
                    boxShadow: '0 0 10px #00ff00'
                }}
            />

            <style jsx>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; }
          50% { text-shadow: 0 0 2px #00ff00, 0 0 5px #00ff00, 0 0 8px #00ff00; }
        }
        
        .terminal-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        .terminal-cursor::after {
          content: '█';
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

            {/* Header */}
            <header className="relative z-10 text-gray-800/90 border-b-2 border-green-400">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-800 border-2 border-green-400 rounded flex items-center justify-center">
                                <Terminal className="w-6 h-6 text-green-400 terminal-glow" />
                            </div>

                        </div>
                        <div className="flex items-center space-x-4 text-green-400 font-mono">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="relative z-10 bg-gray-800/80 border-b border-green-400/50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex space-x-2 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 border-2 font-mono whitespace-nowrap transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-green-400/20 text-green-400 border-green-400 terminal-glow'
                                        : 'bg-gray-800/50 text-green-300 border-green-600 hover:border-green-400 hover:text-green-400'
                                }`}
                            >
                                [{category.toUpperCase()}]
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className="group cursor-pointer"
                        >
                            <div className="bg-gray-800 border-2 border-green-600 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-gray-800 border border-green-400 flex items-center justify-center text-green-400">
                                            {item.icon}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-2xl">{item.image}</div>
                                            <Eye className="w-5 h-5 text-green-400 opacity-60" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-green-400 mb-2 font-mono tracking-wider">
                                        {item.name.toUpperCase()}
                                    </h3>
                                    <div className="flex items-center space-x-4 mb-4 text-green-300 font-mono text-sm">
                                        <span>{item.year}</span>
                                        <span>•</span>
                                        <span>{item.category}</span>
                                    </div>

                                    <p className="text-green-300 text-sm mb-4 font-mono leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                    <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 border border-green-400 font-mono">
                      VISUALIZAR 3D
                    </span>
                                        <ChevronRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* 3D Viewer Modal */}
            {selectedItem && (
                <ThreeViewer item={selectedItem} onClose={closeViewer} />
            )}
        </div>
    );
}