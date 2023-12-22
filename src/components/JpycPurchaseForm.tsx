import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Props = {
  address: string;
  chainId: number;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
  apiKey: string;
};

export default function JpycPurchaseForm(props: Props) {
  const { address, chainId, isSubmitted, setIsSubmitted, apiKey } = props;

  const formSchema = z.object({
    amount: z.coerce.number().int().min(3000, {
      message: '最低購入金額は3000JPYCです。',
    }),
    sendnetwork: z.string(),
    sendnetworkaddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
      message: '正しいウォレットアドレスを入力してください。',
    }),
    kanalastname: z.string().regex(/^[ァ-ヶー]+$/, {
      message: '全角カタカナで入力してください。',
    }),
    kanafirstname: z.string().regex(/^[ァ-ヶー]+$/, {
      message: '全角カタカナで入力してください。',
    }),
    mailaddress: z.string().email({
      message: 'メールアドレスを入力してください。',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sendnetwork: chainId?.toString(),
      sendnetworkaddress: address,
    },
  });

  useEffect(() => {
    form.reset({
      sendnetwork: chainId.toString(),
      sendnetworkaddress: address,
      kanafirstname: form.getValues('kanafirstname'),
      kanalastname: form.getValues('kanalastname'),
      mailaddress: form.getValues('mailaddress'),
    });
  }, [chainId, address, isSubmitted, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      const res = await axios.post('https://app-jpyc-jp.staging.jcam.co.jp/api/public/buy-sell/bank', values, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: apiKey,
        },
      });
      console.log(res);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('申し訳ございません。ただ今ご利用いただけません。');
    }
  }

  return (
    <DialogContent>
      {isSubmitted ? (
        <>
          <div>
            お申し込みが完了いたしました。
            <br />
            メールにて振込先の口座情報をお送りいたしましたのでご確認ください。
          </div>
        </>
      ) : (
        <div>
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
                            <Input required type='number' placeholder='10000' {...field} />
                            <div>JPYC</div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='sendnetwork'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='sendnetwork'>ネットワーク</FormLabel>
                        <Select {...field} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={'ネットワークを選んでください'} />
                            </SelectTrigger>
                          </FormControl>
                          <FormMessage />
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
                    name='sendnetworkaddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='sendnetworkaddress'>送付先ウォレットアドレス</FormLabel>
                        <FormControl>
                          <Input disabled className='mt-2' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-flow-col justify-stretch gap-4 mt-4'>
                    <FormField
                      control={form.control}
                      name='kanalastname'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='kanalastname'>セイ</FormLabel>
                          <FormControl>
                            <Input required placeholder='スズキ' className='mt-2' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='kanafirstname'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor='kanafirstname'>メイ</FormLabel>
                          <FormControl>
                            <Input required placeholder='タロウ' className='mt-2' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='mailaddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='mailaddress'>メールアドレス</FormLabel>
                        <FormControl>
                          <Input required type='email' placeholder='abcdefg@gmail.com' className='mt-2' {...field} />
                        </FormControl>
                        <FormMessage />
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
        </div>
      )}
    </DialogContent>
  );
}
