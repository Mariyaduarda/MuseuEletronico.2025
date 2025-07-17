import React, { // importa o obj default do pacote react
    createContext,
    useState,
    useEffect,
    type ReactNode, // importa somente o time, evitando o runtime
    useContext,
    type JSX,
} from 'react';

//definindo a intervace p valor do context
interface ThemeContextType {
    temaEscuro: boolean;
    setTemaEscuro: React.Dispatch<React.SetStateAction<boolean>>
}
// criar contexto com valor padrao
// ! afirma que ele nao sera nulo qnd usado dentro do provedor
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// criar o componente provedor do contexto
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
    // estado do tema,
    const [temaEscuro, setTemaEscuro] = useState<boolean>(true); // começa escuro por padrao

    useEffect(() => {
        document.documentElement.classList.toggle('dark', temaEscuro);
    }, [temaEscuro]);

    // o valor q sera disponibilizado p componentes filhos
    const contextValue = {
        temaEscuro,
        setTemaEscuro,
    };
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within ThemeProvider"); //mensagem ja vem pronta
    }
    return context;
};
