	import React, { useState, useEffect, useRef } from 'react';
	import type { Secao } from '../layouts/MenuBar'; // pega os tipos de secao

	interface TerminalSimProps {
		crtAtivo: boolean;
		setCrtAtiva: React.Dispatch<React.SetStateAction<boolean>>;
		temaEscuro: boolean;
		setTemaEscuro: React.Dispatch<React.SetStateAction<boolean>>;
  		setSecaoAtual: React.Dispatch<React.SetStateAction<Secao>>;
	}


	const TerminalSim: React.FC<TerminalSimProps> = ({ crtAtivo, setCrtAtiva, temaEscuro, setTemaEscuro, setSecaoAtual }) => {

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

		// pega a referencia do historico do terminal
		const terminalRef = useRef<HTMLDivElement>(null);

		// sempre que o componente 'history' for renderizado e sempre que ele mudar, vai rodar o efeito
		// coloca o foco de volta no campo de texto, pra poder escrever dnv
		//    - basicamente pergunta se o 'inputRef' existe, ou seja, n e nulo (.current?)
		//    - se sim, ele roda o '.focus()' que foca de volta no campo de texto
		useEffect(() => {
			inputRef.current?.focus();
		}, [history]);

		// do mesmo jeito, quando o historico mudar, desce a rolagem o maximo possivel
		useEffect(() => {
			if (terminalRef.current) {
				terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
			}
		}, [history]);

		// pega o comando e vê oq devia fazer
		const rodaComando = (input: string) => {

			//divide o comando em partes
			const comando = input.trim();        // string inteira(removendo espaços extras)
			const partes = comando.split(' ');   // termos separados
			const cmd = partes[0].toLowerCase(); // primeiro termo

			//string pra guardar a resposta do terminal( oq vai aparecer pro usuario)
			let resposta = '';

			// define quais paginas sao validas se eu quiser mudar
			const paginasValidas = ["home", "eletronico", "sobre", "tecnologias-brasileiras", "terminal"];

			//decide oq vai fazer agora
			switch (cmd) {
				case 'help':
					//mostra uma lista de comandos
					resposta = 'Lista de Comandos: \n' +
						' ================================== \n' +
						' help:   Mostra esta lista \n' +
						' clear:  Limpa a tela \n' +
						' sobre:  Fala sobre o projeto \n' +
						' sair:   Volta para home \n' +
						' crt:    Liga/desliga efeito CRT (on/off) \n' +
						' tema:   Muda tema (claro/escuro) \n' +
						' cd:     Muda de seção (ex: cd home) \n' +
						' google: Pesquisa no Google \n' +
						' data:   Mostra a data e hora atual \n' +
						' random: Número aleatório entre X e Y (ex: random 1 100)';
					break;

				case 'clear':
					//limpa o historico
					setHistory([
						'Bem-vinde ao TerminalSim!',
						'Digite "help" pra ver os comandos disponiveis.'
					]);
					return;  // sai da funcao pra n atualizar o historico com 'clear'

				case 'sair':
					//volta para o home
					setSecaoAtual('home');
					break;

				case 'cd':
					//muda para outra página
					if (partes.length < 2) {
						// se n tem args suficientes
						resposta = 'Sintaxe: "cd [nome da secao]"';
					} else {
						//olha na segunda pos pra pegar o nome da secao destino
						const secao = partes[1].toLowerCase();
						const secoesValidas = ["home", "eletronico", "sobre", "tecnologias-brasileiras", "terminal"];
						if (secoesValidas.includes(secao)) {
							// se esse destino existe, vai la
							setSecaoAtual(secao as Secao);
						} else {
							// se n existe, fala o erro
							resposta = `Secao "${secao}" nao encontrada.`;
						}
					}
					break;

				case 'google':
					//faz uma pesquisa no google
					if (partes.length < 2) {
						// se n tem args suficientes
						resposta = 'Sintaxe: "google [pesquisa]"';
					} else {
						// olha nas outras pos pra pegar oq q eu to pesquisando
						// junta tds os outros termos
						const termo = partes.slice(1).join(' ');
						const url = `https://www.google.com/search?q=${encodeURIComponent(termo)}`;
						window.open(url, '_blank');
						resposta = `Pesquisando "${termo}" no Google...`;
					}
					break;

				case 'hora':
				case 'data':
					const agora = new Date();
					resposta = `${agora.toLocaleString()}`;
					break;


				case 'random':
					//gera um numero aleatorio entre dois parametros
					if (partes.length < 3) {
						// se n tem args suficientes
						resposta = 'Sintaxe: "random [min] [max]"';
					} else {
						//pega os dois limites
						const x = Number(partes[1]);
						const y = Number(partes[2]);
						if (isNaN(x) || isNaN(y)) {
							// confere se tem alguma fracao
							resposta = 'Só pode ser números inteiros :(';
						} else {
							//ajusta se os nums estiverem fora de ordem(se y>x )
							const min = Math.ceil(Math.min(x, y));
							const max = Math.floor(Math.max(x, y));
							//calcula os dois e printa o resultado
							const num = Math.floor(Math.random() * (max - min + 1)) + min;
							resposta = `Número aleatório entre ${min} e ${max}: ${num}`;
						}
					}
					break;

				case 'sobre':
					//fala sobre o projeto
					resposta = 'Museu digital quinquilharias.tech - preservando tecnologia brasileira.';
				break;

				case 'crt':
					//liga ou desliga o efeito de CRT
					if (partes.length < 2) {
						// se n tem args suficientes
						resposta = 'Sintaxe: "crt [on/off]"';
					} else if (partes[1].toLowerCase() === 'on') {
						setCrtAtiva(true);
						resposta = 'CRT ativado.';
					} else if (partes[1].toLowerCase() === 'off') {
						setCrtAtiva(false);
						resposta = 'CRT desativado.';
					} else {
						// se escreveu ags suficientes mas errados
						resposta = 'Sintaxe: "crt [on/off]"';
					}
				break;

				case 'tema':
					//muda entre o tema claro e escuro
					if (partes.length < 2) {
						// se n tem args suficientes
						resposta = 'Sintaxe: "tema [claro/escuro]"';
					} else if (partes[1].toLowerCase() === 'claro') {
						setTemaEscuro(false);
						resposta = 'Tema claro ativado.';
					} else if (partes[1].toLowerCase() === 'escuro') {
						setTemaEscuro(true);
						resposta = 'Tema escuro ativado.';
					} else {
						// se escreveu ags suficientes mas errados
						resposta = 'Sintaxe: "tema [claro/escuro]"';
					}
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
			setHistory((atual) => [...atual, `> ${input}`, resposta]);
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
			className="terminal-font bg-black text-green-400 p-4 rounded-lg md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto shadow-lg mt-5 aspect-[5/4] min-h-0"
			style={{
				minHeight: '300px',				// define altura minima
				boxShadow: '0 0 5px #00ff00', // define uma borda, como sombra
			}}
			// se clicar em qualquer lugar dentro daqui, foca na caixa de entrada
			onClick={() => inputRef.current?.focus()}
			>
				{/* Historico dos comandos */}
				<div 
				ref={terminalRef} // Pega a referencia para poder descer no Terminal
				className="overflow-y-auto max-h-[95%] whitespace-pre-wrap text-left terminal-glow terminal-scrollbar">

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
