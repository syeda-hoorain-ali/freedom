"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signUpSchema } from "@/schema/signUpSchema";
import { toast } from "react-toastify";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp = () => {

  type SignUp = z.infer<typeof signUpSchema>

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const onSubmit = async (data: SignUp) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      console.log(response)

      if (response.data.success) {
        toast.success("Successfully sign up")
        router.replace('/')
      } 
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const message = axiosError.response?.data.message || axiosError.message
      console.error(error);
      toast.error(message)
    }

    setIsSubmitting(false)
  }

  return (<>
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign up
          </h1>
          <p className="mb-4">Sign up to start shopping</p>
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
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ?
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" /> Please wait
                </> :
                "Sign up"
              }
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
            Sign in</Link>
          </p>
        </div>

      </div>
    </div>

  </>)
}

export default SignUp;
