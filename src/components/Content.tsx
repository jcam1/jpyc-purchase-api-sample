'use client';

import { useAddress, useChain, useConnectionStatus, useContract, useTokenBalance } from '@thirdweb-dev/react';
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
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const jpycContractAddress = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';
const supportChainIds = [1, 137, 100, 336, 43114, 592];

export default function Content() {
  const chain = useChain();
  const address = useAddress();
  const { contract } = useContract(jpycContractAddress, 'token');
  const { data, isLoading } = useTokenBalance(contract, address);
  const connectionStatus = useConnectionStatus();
  const form = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  if (connectionStatus === 'unknown') {
    return <div>Loading...</div>;
  } else if (connectionStatus === 'disconnected') {
    return <div>You are not connected.</div>;
  } else if (connectionStatus === 'connecting') {
    return <div>Connecting...</div>;
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>JPYCの購入</DialogTitle>
            <DialogDescription className='px-2 pt-4 pb-2'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex flex-col items-stretch'>
                  <FormField
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='amount'>購入金額</FormLabel>
                        <FormControl>
                          <div className='flex items-center gap-3 mt-2'>
                            <Input type='number' placeholder='10,000' {...field} />
                            <div>JPYC</div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='network'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='network'>ネットワーク</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={'ネットワークを選んでください'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>Ethereum</SelectItem>
                            <SelectItem value='137'>Polygon</SelectItem>
                            <SelectItem value='100'>Gnosis</SelectItem>
                            <SelectItem value='336'>Shiden</SelectItem>
                            <SelectItem value='43114'>Avalanche</SelectItem>
                            <SelectItem value='592'>Astar</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='walletAddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='walletAddress'>送付先ウォレットアドレス</FormLabel>
                        <FormControl>
                          <Input className='mt-2' defaultValue={field.value} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-flow-col justify-stretch gap-4 mt-4'>
                    <FormField
                      control={form.control}
                      name='kanaLastName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='kanaLastName'>セイ</FormLabel>
                          <FormControl>
                            <Input placeholder='スズキ' className='mt-2' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='kanaFirstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='kanaFirstName'>メイ</FormLabel>
                          <FormControl>
                            <Input placeholder='タロウ' className='mt-2' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='email'>メールアドレス</FormLabel>
                        <FormControl>
                          <Input type='email' placeholder='abcde@gmail.com' className='mt-2' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='mx-12'>
                    購入する
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
