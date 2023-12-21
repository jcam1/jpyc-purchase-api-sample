'use client';

import { useAddress, useChain, useConnectionStatus, useContract, useTokenBalance } from '@thirdweb-dev/react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import JpycPurchaseForm from './jpyc-purchase-form';
import { useState } from 'react';

const jpycContractAddress = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';
const supportChainIds = [1, 137, 100, 336, 43114, 592];

export default function Content() {
  const chain = useChain();
  const address = useAddress();
  const { contract } = useContract(jpycContractAddress, 'token');
  const { data, isLoading } = useTokenBalance(contract, address);
  const connectionStatus = useConnectionStatus();
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  if (connectionStatus === 'unknown' || connectionStatus === 'connecting') {
    return <div>Loading...</div>;
  } else if (connectionStatus === 'disconnected') {
    return <div>You are not connected.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (chain?.chainId && !supportChainIds.includes(chain.chainId)) {
    return <div>Unsupported network.</div>;
  }

  return (
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex flex-col justify-start gap-2 text-slate-700 dark:text-slate-300'>
        <div className='text-lg'>
          balance: {data?.displayValue} <span className='text-sm'>JPYC</span>
        </div>
        <div className='text-lg'>network: {chain?.name}</div>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button>JPYCを購入する</Button>
        </DialogTrigger>
        <JpycPurchaseForm />
      </Dialog>
    </div>
  );
}
