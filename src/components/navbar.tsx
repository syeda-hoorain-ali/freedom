"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { searchSchema } from "@/schema/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/categories";
import { LayoutDashboardIcon, LogOutIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";

const Navbar = () => {
  type Search = z.infer<typeof searchSchema>

  const { data: session } = useSession();
  const user: User = session?.user;
  const router = useRouter();

  const form = useForm<Search>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      category: 'all',
      query: ''
    }
  })


  const onSubmit = async (data: Search) => {
    const params = new URLSearchParams()
    params.set('category', data.category)
    params.set('query', data.query)

    router.push(`/results?${params.toString()}`);
  }

  return (<>
    <nav className="fixed w-full z-50">
      <div className="bg-slate-800 px-5 py-2 flex justify-between gap-20">
        <div className="logo">
          <Link href='/' className="flex items-center gap-1">
            <Image src="/logo.png" alt="Freedom" height={40} width={40} />
            <span className="font-bold text-xl text-[#1dc656]">FREEDOM</span>
          </Link>
        </div>

        {/* search */}
        <div className="w-fit sm:w-full h-10 bg-[#009432] border-2 border-[#009432] flex text-black rounded-lg overflow-hidden">
          <Form {...form}>
            <form className="flex w-full gap-1" onSubmit={form.handleSubmit(onSubmit)}>

              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-44">

                    <Controller
                      name="category"
                      control={form.control}
                      render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="bg-white hidden sm:flex gap-2 rounded">
                              <SelectValue className="text-black">All</SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {categories.map(item => (
                              <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormItem>
                )}
              />

              <FormField
                name="query"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Search Freedom"
                        className="hidden sm:block bg-white rounded"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="aspect-square p-0 rounded bg-[#009432] hover:bg-[#1dc656] hover:text-black">
                <SearchIcon />
              </Button>
            </form>
          </Form>
        </div>

        <div className="flex items-center gap-5">
          <Link href='/cart'>
            <ShoppingCartIcon className="size-5 cursor-pointer text-gray-200 hover:text-white" />
          </Link>


          {session ?
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="/logo.png" />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel className="-mb-3">{user.username}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-light text-gray-600 text-sm">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {session.user.isAdmin ?
                  <DropdownMenuItem>
                    <Link href='/admin/dashboard' className="flex gap-1 items-center">
                      <LayoutDashboardIcon className="size-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem> : ''
                }

                <DropdownMenuItem onClick={() => signOut()} className="flex gap-1 items-center">
                  <LogOutIcon className="size-4" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu> :

            <div className="flex gap-3">
              <Link href="/sign-in">
                <Button className="bg-[#009432] hover:bg-[#1dc656]">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-[#009432] hover:bg-[#1dc656]">
                  Sign up
                </Button>
              </Link>
            </div>
          }
        </div>
      </div>

      <div className="bg-[#e0b6d1] text-black py-1 px-2 hidden sm:block">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores, recusandae?</div>
    </nav>
  </>)
}

export default Navbar;
