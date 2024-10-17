"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schema/signInSchema";
import { toast } from "react-toastify";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignIn = () => {

  type SignIn = z.infer<typeof signInSchema>

  const router = useRouter();

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: SignIn) => {

    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    })

    if (response?.error) {
      if (response.error === 'CredentialsSignin') {
        toast.error("Incorrect email or password.")
      } else {
        toast.error(response.error)
      }
    }

    if (response?.url) {
      toast.success("Successfully sign in")
      router.replace('/')
    }
  }

  return (<>
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign in
          </h1>
          <p className="mb-4">Sign in to start shopping</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign in</Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            New customer?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>

  </>)
}

export default SignIn;
