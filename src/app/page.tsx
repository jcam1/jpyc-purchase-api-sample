'use client';

import Content from '@/components/Content';
import Header from '@/components/Header';
import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  ja,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

export default function Home() {
  return (
    <ThirdwebProvider
      activeChain={1}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      locale={ja()}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        embeddedWallet({
          auth: {
            options: ['email', 'google', 'apple', 'facebook'],
          },
        }),
      ]}
    >
      <Header />
      <main className='flex min-h-screen flex-col items-center p-6'>
        <Content />
      </main>
    </ThirdwebProvider>
  );
}
