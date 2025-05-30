const hre = require("hardhat");

const metadatas = [
  "URL_DEL_METADATA"
];

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const contrato = await hre.ethers.getContractAt("MiNFT", "DIRECCION_DEL_CONTRATO");
  for (const uri of metadatas) {
    const tx = await contrato.acunar(deployer.address, uri);
    await tx.wait();
    console.log(`Acuñado NFT con URI: ${uri}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
