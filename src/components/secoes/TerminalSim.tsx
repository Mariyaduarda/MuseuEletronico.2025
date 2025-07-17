	import React, { useState, useEffect, useRef } from 'react';

	interface TerminalSimProps {
		crtAtivo: boolean;
		setCrtAtiva: React.Dispatch<React.SetStateAction<boolean>>;
		temaEscuro: boolean;
		setTemaEscuro: React.Dispatch<React.SetStateAction<boolean>>;
	}

	const TerminalSim: React.FC<TerminalSimProps> = ({ crtAtivo, setCrtAtiva, temaEscuro, setTemaEscuro }) => {

		// ============================================================
		// FUNCOES

		const [input, setInput] = useState(''); // Texto atual digitado
		// const [input, setInput] = useState('');
		// useState e' um hook.
		// a funcao declara que 'input' vai ser o valor atual(no caso, nada pois '')
		// e declara que 'setInput' e' a funcao que vai mudar esse valor

		const [history, setHistory] = useState<string[]>([
			'Bem-vinde ao TerminalSim!',
			'Digite "help" pra ver os comandos disponiveis.'
		]); // hook tbm. guarda as linhas que ja foram digitadas no terminal

		// pega a referencia pra realmente ler a entrada do usuario
		// comeca nula pois n foi renderizada na tela ainda
		const inputRef = useRef<HTMLInputElement>(null);

		// sempre que o componente 'history' for renderizado e sempre que ele mudar, vai rodar o efeito
		// coloca o foco de volta no campo de texto, pra poder escrever dnv
		//    - basicamente pergunta se o 'inputRef' existe, ou seja, n e nulo (.current?)
		//    - se sim, ele roda o '.focus()' que foca de volta no campo de texto
		useEffect(() => {
			inputRef.current?.focus();
		}, [history]);

		// pega o comando e vê oq devia fazer
		const rodaComando = (cmd: string) => {
			//cmd é o comando que o usuario escreveu

			// .toLowerCase() - coloca td em minusculo
			// .trim()        - tira espacos no comeco e fim
			const cmdLimpo = cmd.toLowerCase().trim();

			//string pra guardar a resposta do terminal( oq vai aparecer pro usuario)
			let resposta = '';

			//decide oq vai fazer agora
			switch (cmdLimpo) {
				case 'help':
					resposta = 'Comandos: help, clear, sobre, sair, crt on/off, tema claro/escuro';
					break;
				case 'sobre':
					resposta = 'Museu digital quinquilharias.tech - preservando tecnologia brasileira.';
					break;
				case 'clear':
					setHistory([]);
					return;
				case 'sair':
					resposta = 'Até logo!';
					break;
				case 'crt on':
					setCrtAtiva(true);
					resposta = 'CRT ativado.';
					break;
				case 'crt off':
					setCrtAtiva(false);
					resposta = 'CRT desativado.';
					break;
				case 'tema claro':
					setTemaEscuro(false);
					resposta = 'Tema claro ativado.';
					break;
				case 'tema escuro':
					setTemaEscuro(true);
					resposta = 'Tema escuro ativado.';
					break;
				default:
					resposta = `Comando não reconhecido: ${cmd}`;
			}

			// atualiza o historico.
			// como foi criado pelo hook, ele ja recebe o valor atual do vetor
			// e simplesmente coloca o comando atual e a resposta no final
			//    - '[...]' vai pegar todos os vetores de 'atual'
			//    - adiciona 'novoItem' no prev:
			//		(prev) => [...prev, novoItem]
			setHistory((atual) => [...atual, `> ${cmd}`, resposta]);
		};

		// lida com oq acontece quando aperta enter
		//	- 'e' é o evento 'React.FormEvent', q é quando aperta enter pra enviar o form
		const onSubmit = (e: React.FormEvent) => {
			e.preventDefault();        // nao deixa fazer oq normalmente faria( recarregar a página )
			if (!input.trim()) return; // pega a entrada e usa '.trim()' pra tirar espacos. se n sobra nd, retorna pois n tem comando
			rodaComando(input);        // se deu ok, manda pra função decidir oq vai fazer com essa entrada
			setInput('');              // assim que rodar, limpa a entrada.
		};


		// ============================================================
		// COMPONENTE
		return (
			
			// Borda
			<div
			className="terminal-font bg-black text-green-400 p-4 rounded-lg max-w-3xl mx-auto shadow-lg mt-5"
			style={{
				minHeight: '300px',				// define altura minima
				boxShadow: '0 0 5px #00ff00', // define uma borda, como sombra
			}}
			// se clicar em qualquer lugar dentro daqui, foca na caixa de entrada
			onClick={() => inputRef.current?.focus()}
			>
				{/* Historico dos comandos */}
				<div className="overflow-y-auto max-h-60 whitespace-pre-wrap text-left terminal-glow">
					{/* A função '.map' percorre o vetor 'history' e roda algo com cada elemento */}
					{/* nesse caso, cria um 'div' com o conteudo de cada uma das linhas */}
					{history.map((linha, i) => (
					<div key={i}>{linha}</div>
					))}
				</div>

				{/* Campo de entrada */}
				<form onSubmit={onSubmit} className="flex items-center">
					{/* Simbolo '>' tem q ser escrito como &gt; */}
					<span className="mr-2 terminal-glow">&gt;</span>
					{/* Campo de entrada em si */}
					<input
					ref={inputRef}
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="bg-black text-green-400 outline-none terminal-font w-full terminal-glow"
					autoComplete="off"
					spellCheck={false}
					/>
				</form>

			</div>
		);
	};

	export default TerminalSim;
