const hre = require("hardhat");

async function main() {
  const MiNFT = await hre.ethers.getContractFactory("MiNFT");
  const contrato = await MiNFT.deploy();
  await contrato.deployed();
  console.log("Contrato desplegado en:", contrato.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
