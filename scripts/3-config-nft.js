import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
	try {
		const editionDrop = await sdk.getContract(
			"0x4998B6d614B3e6B9595E0362B5800B27b346035F",
			"edition-drop"
		);
		await editionDrop.createBatch([
			{
				name: "Dog Super Estilo",
				description: "Esse NFT vai te dar acesso ao limbDAO!",
				image: readFileSync("scripts/assets/dog.jpg"),
			},
		]);
		console.log("✅ Novo NFT criado com sucesso no !");
	} catch (error) {
		console.error("falha ao criar o novo NFT", error);
	}
})();
