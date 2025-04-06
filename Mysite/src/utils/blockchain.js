import  {ethers } from "ethers";
import contractABI from "../contracts/EducationCredential.json";
import contractAddress from "../contracts/EducationCredential-address.json";

import axios from "axios";

export const uploadToIPFS = async (file) => {
  if (!file) {
    alert("No file selected");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: `cc7906fd0f0832bfe7bb`,
          pinata_secret_api_key: `a6876ff8914d8cce3df0ebdd36649de7cf1b3e17f96b82ad4be9aa74814f7035`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!res.data || !res.data.IpfsHash) {
      throw new Error("Invalid response from Pinata");
    }

    const ipfsHash = res.data.IpfsHash;
    const ipfsURL = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    console.log("✅ Uploaded to IPFS:", ipfsURL);
    return ipfsURL;
  } catch (error) {
    console.error("❌ IPFS upload error:", error);
    alert("IPFS upload failed. Check console for details.");
    return null;
  }
};



export const getContract = async () => {
  console.log("Getting contract...");
  console.log(contractABI.abi);
  const provider = new ethers.BrowserProvider(window.ethereum); // MetaMask
  const signer = await provider.getSigner(); // ❗ await this

  const contract = new ethers.Contract(
    contractAddress.CertificateNFT,
    contractABI.abi,
    signer
  );

  console.log("done");
  console.log(contract);

  return contract;
};

