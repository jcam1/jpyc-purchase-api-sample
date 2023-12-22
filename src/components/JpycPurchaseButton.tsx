'use client';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import JpycPurchaseForm from './JpycPurchaseForm';

type Props = {
  address?: string;
  chainId?: number;
  apiKey?: string;
};

export default function JpycPurchaseButton(props: Props) {
  const { apiKey, address, chainId } = props;

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!address || !chainId || !apiKey) {
    return <Button disabled>JPYCを購入する</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button onClick={() => setIsSubmitted(false)}>JPYCを購入する</Button>
      </DialogTrigger>
      <JpycPurchaseForm
        address={address}
        chainId={chainId}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        apiKey={apiKey}
      />
    </Dialog>
  );
}
