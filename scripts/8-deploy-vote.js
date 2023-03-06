import sdk from "./1-initialize-sdk.js";

(async () => {
	try {
		const voteContractAddress = await sdk.deployer.deployVote({
			// Dê um nome para o seu contrato de governança.
			name: "ClimbDAO - A DAO dos escaladores",

			// Essa a localização do seu token de governança, nosso contrato ERC-20!
			voting_token_address: "0xa539c51844Db530E45dA73E8c6C184BC9546bA06",

			// Depois de uma proposta ser criada, quando os membros podem começar a votar?
			// Por agora, colocamos isso como imediatamente.
			voting_delay_in_blocks: 0,

			// Por quanto tempo membros podem votar em uma proposta quando ela é criada?
			// Aqui, nós configuramos como 1 dia (6570 blocos)
			voting_period_in_blocks: 6570,

			// A % mínima da oferta total que precisa votar
			// para que a proposta sejá válida
			voting_quorum_fraction: 0,

			// Qual a # mínima de tokens que um usuário precisa para poder criar uma proposta?
			// Eu coloco 0. Significando que nenhum token é necessário para um usuário poder
			// criar uma proposta.
			proposal_token_threshold: 0,
		});

		console.log(
			"✅ Módulo de votos implantado com sucesso no endereço:",
			voteContractAddress
		);
		// 0xB7BC5A82A300D5816E87Be2f13b0321c8C08B784
	} catch (err) {
		console.error("Falha ao implantar o módulo de votos", err);
	}
})();
