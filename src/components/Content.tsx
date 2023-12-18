'use client';

import { useAddress, useChain, useContract, useSDK, useTokenBalance } from '@thirdweb-dev/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';

// if you want to use other chain, you should change these values.
const chainId = 43114; // avalanche mainnet
const chainName = 'Avalanche Mainnet';
const jpycContractAddress = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';

export default function Content() {
  const sdk = useSDK();
  const chain = useChain();
  const address = useAddress();
  const { contract } = useContract(jpycContractAddress, 'token');
  const { data, isLoading } = useTokenBalance(contract, address);

  if (sdk?.wallet.isConnected() === false) {
    return <div>Connect Wallet</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (chain?.chainId !== chainId) {
    return <div>Connect to {chainName}</div>;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>JPYCを購入する</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>JPYCの購入</DialogTitle>
            <DialogDescription>...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className='pt-4'>{data?.displayValue} JPYC</div>
    </div>
  );
}
