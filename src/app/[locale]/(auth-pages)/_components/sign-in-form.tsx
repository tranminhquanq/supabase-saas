'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@/libs/supabase/client';
import type {
  SignInFormValues,
} from '@/validations/auth.validation';
import {
  SignInFormSchema,
} from '@/validations/auth.validation';

export default function SignInForm() {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(formValues: SignInFormValues) {
    const { data, error } = await supabase.auth.signInWithPassword(
      formValues,
    );
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } else {
      toast({
        title: 'Success',
        description: `Welcome back, ${data.user.email}`,
      });
      router.push('/protected');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign In</Button>
        <p>
          If you don't have an account, please
          {' '}
          <Link href="/sign-up" className="text-blue-500 underline">sign up</Link>
        </p>
      </form>
    </Form>
  );
}
