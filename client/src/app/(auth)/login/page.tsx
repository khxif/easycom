"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/hooks/mutations";
import { useAuthStore } from "@/stores/auth-store";
import { loginSchema, LoginSchemaType } from "@/zod-schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const authenticate = useAuthStore((state) => state.authenticate);
  const { mutateAsync } = useLoginMutation();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    try {
      const { user, token } = await mutateAsync(values);
      authenticate(user, token);

      toast.success("Logged in successfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response)
        toast.error(axiosError.response?.data?.message || "Unknown error");
      else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 font-medium">
      <h1 className="text-2xl">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormDescription>Enter your registered Email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password123" {...field} />
                </FormControl>
                <FormDescription>Enter your Password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <Label className="flex space-x-1 text-primary/75">
        <p> Don&apos;t have an account?</p>
        <Link href="/signup" className="text-primary">
          Signup Here.
        </Link>
      </Label>
    </div>
  );
}
