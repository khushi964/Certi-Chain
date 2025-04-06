import { ethers } from "ethers";
import contractABI from "../contracts/EducationCredential.json";
import contractAddress from "../contracts/EducationCredential-address.json";

export const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const res = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
      method: 'POST',
      body: formData
    });
  
    const data = await res.json();
    return data.Hash;
  };
  
export const getContract = () => {
  const provider = new ethers.BrowserProvider(window.ethereum); // for MetaMask
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress.CertificateNFT,
    contractABI.abi,
    signer
  );
  return contract;
};
