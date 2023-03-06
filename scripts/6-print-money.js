import sdk from "./1-initialize-sdk.js";

// Esse é o endereço do nosso contrato ERC-20 impresso no passo anterior.
const token = await sdk.getContract(
	"0xa539c51844Db530E45dA73E8c6C184BC9546bA06",
	"token"
);

(async () => {
	try {
		// Qual o fornecimento máximo que você quer? 1,000,000 é um número legal!
		const amount = 1_000_000;
		// Interaja com o seu contrato ERC-20 e cunhe os tokens!
		await token.mint(amount);
		const totalSupply = await token.totalSupply();

		// Mostre quantos dos seus tokens existem agora!
		console.log(
			"✅ Agora temos",
			totalSupply.displayValue,
			"$CLIMBERS em circulação"
		);
	} catch (error) {
		console.error("Falha ao imprimir o dinheiro", error);
	}
})();
