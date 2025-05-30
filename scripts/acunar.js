const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const contrato = await hre.ethers.getContractAt("MiNFT", "DIRECCION_DEL_CONTRATO");
  const tx = await contrato.acunar(deployer.address, "URL_DEL_METADATA");
  await tx.wait();
  console.log("NFT acunado con éxito");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
