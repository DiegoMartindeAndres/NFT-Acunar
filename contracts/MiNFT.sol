// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MiNFT is ERC721URIStorage {
    uint256 public contador;

    constructor() ERC721("MiNFT", "MNFT") {}

    function acunar(address destinatario, string memory tokenURI) public returns (uint256) {
        uint256 nuevoId = contador;
        _mint(destinatario, nuevoId);
        _setTokenURI(nuevoId, tokenURI);
        contador++;
        return nuevoId;
    }
}
