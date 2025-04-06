import React, { useEffect, useState } from "react";
import CertificateViewer from "./CertificateViewer";
import { getContract } from "../utils/blockchain";

const CertificateView = ({ walletAddress }) => {
  const [tokenIds, setTokenIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const contract = await getContract();
        const balance = await contract.balanceOf(walletAddress);

        const ids = [];
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(walletAddress, i);
          ids.push(tokenId.toString());
        }

        setTokenIds(ids);
      } catch (err) {
        console.error("Error fetching token IDs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      fetchTokens();
    }
  }, [walletAddress]);

  if (loading) return <p>Loading your certificates...</p>;

  return (
    <div>
      <h2>Your Certificates</h2>
      {tokenIds.length > 0 ? (
        tokenIds.map((id) => <CertificateViewer key={id} tokenId={id} />)
      ) : (
        <p>No certificates found for your wallet address.</p>
      )}
    </div>
  );
};

export default CertificateView;
