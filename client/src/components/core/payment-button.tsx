'use client';

import { useCreateOrderMutation, useVerifyOrderMutation } from '@/hooks/mutations';
import { useAuthStore } from '@/stores/auth-store';
import type { RazorpayOrderOptions } from 'react-razorpay';
import { useRazorpay } from 'react-razorpay';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export function PaymentButton({ amount }: { amount: number }) {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const { Razorpay } = useRazorpay();

  const { mutateAsync: createOrderMutation } = useCreateOrderMutation();
  const { mutateAsync: verifyOrderMutation } = useVerifyOrderMutation();

  const handlePayment = async () => {
    try {
      const { data: order } = await createOrderMutation({ amount, user_id: user?._id as string });
      console.log(order);

      const options: RazorpayOrderOptions = {
        key: String(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
        amount: order.amount,
        currency: order.currency,
        name: 'Easycom',
        description: 'Payment for your order',
        order_id: order.id,
        handler: async response => {
          try {
            await verifyOrderMutation({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user?._id as string,
            });

            toast.success('Payment successful!');
            router.push('/');
          } catch (error) {
            toast.error('Payment failed: ' + (error as Error).message);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone_number,
        },
        notes: 'Razorpay Corporate Office',

        theme: {
          color: '#3399cc',
        },
      };
      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={handlePayment} className="mt-auto">
      Buy now
    </Button>
  );
}
