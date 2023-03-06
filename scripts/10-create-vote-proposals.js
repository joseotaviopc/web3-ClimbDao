import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

(async () => {
	try {
		// Nosso contrato de votação.
		const vote = await sdk.getContract(
			"0xB7BC5A82A300D5816E87Be2f13b0321c8C08B784",
			"vote"
		);

		// Nosso contrato ERC-20.
		const token = await sdk.getContract(
			"0xa539c51844Db530E45dA73E8c6C184BC9546bA06",
			"token"
		);
		const amount = 400_000;
		// Crie uma proposta para cunhar 400.000 novos tokens para o tesouro.
		const description =
			"Cunhar para a DAO uma quantidade adicional de " +
			amount +
			" tokens no tesouro?";

		const executions = [
			{
				// Nosso token module que de fato executa a cunhagem.
				toAddress: token.getAddress(),
				// Nosso nativeToken é ETH. nativeTokenValue é a quantidade de ETH que nós queremos
				// mandar nessa proposta. Nesse caso, estamos mandando 0 ETH.
				// Nós estamos apenas cunhando novos tokens para o tesouro. Então, deixe 0.
				nativeTokenValue: 0,
				// Estamos fazendo uma cunhagem! E, estamos cunhando no vote, que está
				// agindo como nosso tesouro.
				// nesse caso, usamos ethers.js para converter a quantidade
				// ao formato correto. Isso porque a quantidade precisa ser em wei
				transactionData: token.encoder.encode("mintTo", [
					vote.getAddress(),
					ethers.utils.parseUnits(amount.toString(), 18),
				]),
			},
		];

		await vote.propose(description, executions);

		console.log("✅ Proposta de cunhar tokens criada com sucesso!");
	} catch (error) {
		console.error("falha ao criar primeira proposta", error);
		process.exit(1);
	}

	try {
		// Nosso contrato de votação.
		const vote = await sdk.getContract(
			"0xB7BC5A82A300D5816E87Be2f13b0321c8C08B784",
			"vote"
		);
		// Nosso contrato ERC-20.
		const token = await sdk.getContract(
			"0xa539c51844Db530E45dA73E8c6C184BC9546bA06",
			"token"
		);
		// Crie uma proposta para transferir para nós mesmos 5,000 tokens por sermos irados.
		const amount = 5_000;
		const description =
			"A DAO deveria transferir " +
			amount +
			" tokens do tesouro para " +
			process.env.WALLET_ADDRESS +
			" por ser uma pessoa incrível?";

		const executions = [
			{
				// Novamente, estamos mandando para nós mesmos 0 ETH. Apenas mandando nosso próprio token.
				nativeTokenValue: 0,
				transactionData: token.encoder.encode(
					// Nós estamos fazendo uma transferência do tesouro para a nossa carteira.
					"transfer",
					[
						process.env.WALLET_ADDRESS,
						ethers.utils.parseUnits(amount.toString(), 18),
					]
				),

				toAddress: token.getAddress(),
			},
		];

		await vote.propose(description, executions);

		console.log(
			"✅ Proposta de dar prêmio do tesouro para si mesmo criada com sucesso, vamos torcer para votarem sim!"
		);
	} catch (error) {
		console.error("falha ao criar segunda proposta", error);
	}
})();
