import { ConnectWallet } from '@thirdweb-dev/react';
import { ModeToggle } from './ui/mode-toggle';
import { useTheme } from 'next-themes';

export default function Header() {
  const { resolvedTheme } = useTheme();

  return (
    <div className='flex justify-end items-center gap-4 py-4 px-6'>
      <ModeToggle />
      <ConnectWallet theme={resolvedTheme === 'dark' ? 'dark' : 'light'} modalSize={'compact'} />
    </div>
  );
}
