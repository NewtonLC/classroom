import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import AuthButton from '../components/authButton';

export default function Navbar({ children }) {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const hasAccess = role === 'ADMIN' || role === 'TEACHER';
  const isAdmin = role === 'ADMIN';

  return (
    <div className='h-[38px]'>
      <div className='h-[38px] bg-fcc-gray-90 text-white flex items-center flex-wrap p-1'>
        <div className='hidden lg:flex block flex-1 justify-end'></div>
        <Link href='/classes' className='flex items-center'>
          <Image
            className=''
            priority
            layout='fixed'
            src='/images/fcc_primary_large.png'
            alt='FreeCodecamp Logo'
            width={210}
            height={24}
          ></Image>
        </Link>
        <div className='flex-1 inline-flex justify-end'>
          {hasAccess && (
            <div className='pl-2 hidden md:block'>
              <Link href='/classes'>
                {isAdmin ? 'Dashboard' : 'Classes'}
              </Link>
            </div>
          )}
          {React.Children.toArray(children).map(child => (
            <div className='pl-2 hidden md:block' key={child.key}>
              {child}
            </div>
          ))}
          <div className='pl-2'>
            <AuthButton></AuthButton>
          </div>
        </div>
      </div>
    </div>
  );
}
