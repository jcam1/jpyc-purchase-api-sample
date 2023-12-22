'use client';
import { useAddress, useChain } from '@thirdweb-dev/react';
import JpycPurchaseButton from './JpycPurchaseButton';
import WalletInfo from './WalletInfo';

export default function Content() {
  const chain = useChain();
  const address = useAddress();

  return (
    <div className='flex flex-col gap-4 items-center'>
      <WalletInfo />
      <JpycPurchaseButton
        address={address}
        chainId={chain?.chainId}
        apiKey={process.env.NEXT_PUBLIC_JPYC_PURCHASE_API_KEY}
      />
    </div>
  );
}
