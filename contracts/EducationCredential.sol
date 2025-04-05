// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract EducationCredential is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Struct to store metadata for each certificate
    struct Certificate {
        string studentName;
        string institution;
        string course;
        uint256 issueDate;
        string certificateTokenURI; // Renamed to avoid conflict with tokenURI function
    }

    // Mapping to associate tokenId with Certificate metadata
    mapping(uint256 => Certificate) private _certificates;

    constructor(address initialOwner)
        ERC721("EducationCredential", "EDU")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://crimson-occasional-vicuna-689.mypinata.cloud/ipfs/";
    }

    function safeMint(
        address to,
        string memory studentName,
        string memory institution,
        string memory course,
        uint256 issueDate,
        string memory uri
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        // Store metadata for the minted token
        _certificates[tokenId] = Certificate({
            studentName: studentName,
            institution: institution,
            course: course,
            issueDate: issueDate,
            certificateTokenURI: uri // Use renamed field
        });

        return tokenId;
    }

    // Function to retrieve metadata for a specific tokenId
    function getCertificateMetadata(uint256 tokenId)
        public
        view
        returns (
            string memory studentName,
            string memory institution,
            string memory course,
            uint256 issueDate,
            string memory certificateTokenURI // Renamed field
        )
    {
        Certificate memory cert = _certificates[tokenId];
        return (
            cert.studentName,
            cert.institution,
            cert.course,
            cert.issueDate,
            cert.certificateTokenURI // Use renamed field
        );
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
