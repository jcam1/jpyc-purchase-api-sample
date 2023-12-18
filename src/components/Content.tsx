'use client'

import { useAddress, useChain, useContract, useTokenBalance } from "@thirdweb-dev/react";

// if you want to use other chain, you should change these values.
const chainId = 43114; // avalanche mainnet
const chainName = "Avalanche Mainnet";
const jpycContractAddress = "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB";

export default function Content() {
  const chain = useChain();
  const address = useAddress();
  const { contract } = useContract(jpycContractAddress, "token");
  const { data, isLoading } = useTokenBalance(
    contract,
    address,
  );

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (chain?.chainId !== chainId) {
    return (
      <div>Connect to {chainName}</div>
    );
  }

  return (
    <div>
      <div className="pt-4">{data?.displayValue} JPYC</div>
    </div>
  );
}
