import { LayoutDashboardIcon,  ShirtIcon,  ShoppingBagIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className='fixed h-screen px-3 py-4 sm:w-56 text-white bg-slate-800'>
      <ul className='flex flex-col gap-4'>
        <li>
          <Link className='flex items-center gap-2' href='/admin/dashboard'>
            <LayoutDashboardIcon className='size-6' />
            <span className='hidden sm:block'>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link className='flex items-center gap-2' href='/admin/users'>
            <User2Icon className='size-6' />
            <span className='hidden sm:block'>Users</span>
          </Link>
        </li>
        <li>
          <Link className='flex items-center gap-2' href='/admin/orders'>
            <ShoppingBagIcon className='size-6' />
            <span className='hidden sm:block'>Orders</span>
          </Link>
        </li>
        <li>
          <Link className='flex items-center gap-2' href='/admin/products'>
            <ShirtIcon className='size-6' />
            <span className='hidden sm:block'>Products</span>
          </Link>
        </li>
      </ul>

    </aside>
  );
};

export default Sidebar;
