import React, { useEffect, useState } from "react";
import { getContract } from "../utils/blockchain";

const CertificateViewer = ({ tokenId }) => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const contract = await getContract();
        const tokenURI = await contract.tokenURI(tokenId);
        const res = await fetch(tokenURI);
        const data = await res.json();
        setMetadata(data);
      } catch (err) {
        console.error("Error fetching metadata:", err);
      }
    };

    fetchMetadata();
  }, [tokenId]);

  return (
    <div>
      {metadata ? (
        <div>
          <h2>{metadata.name}</h2>
          <p>{metadata.description}</p>
          <img src={metadata.image} alt="Certificate" />
        </div>
      ) : (
        <p>Loading metadata...</p>
      )}
    </div>
  );
};

export default CertificateViewer;
