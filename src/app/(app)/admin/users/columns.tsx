"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AdminApiResponse } from "@/types/ApiResponse";

export interface User {
  _id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  image?: Buffer;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black font-semibold"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: () => <div className="text-black font-semibold">Username</div>,
  },
  {
    accessorKey: "isAdmin",
    header: () => <div className="text-black font-semibold">Admin</div>,
    cell:(props) => <CellComponent isAdmin={props.getValue<boolean>()} userId={props.row.original._id} />,
  },
];


const CellComponent = ({isAdmin, userId}: {isAdmin: boolean; userId: string}) => {

  const [isChecked, setIsChecked] = useState(isAdmin);

  const handleToggle = async () => {

    try {
      const response = await axios.patch(`/api/admin/update-user-role`, {
        userId,
        isAdmin: !isChecked,
      });
      if (response.data.success) {
        setIsChecked(!isChecked);
        toast.success("User role updated successfully!");
      } else {
        toast.error("Failed to update user role.");
      }
      
    } catch (error) {
      const axiosError = error as AxiosError<AdminApiResponse>;
      const message = axiosError.response?.data.message || axiosError.message;
      console.error(error);
      toast.error(message);
    }
  };

  return <Switch checked={isChecked} onCheckedChange={handleToggle} />;

}
