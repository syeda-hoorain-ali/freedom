"use client";

import { useEffect, useState } from "react";
import { columns, User } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "react-toastify";
import { getUsers } from "@/lib/data";

const Page = () => {
  const [data, setData] = useState<User[]>([]);

  const getData = async () => {
    const { message, users } = await getUsers()
    setData(users)
    if (users.length === 0) toast.error(message);
  }


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container md:mx-16 mx-auto py-10">
      <DataTable columns={columns} data={data} placeholder="Search email..." searchBy="email" />
    </div>
  );
};

export default Page;
