import { Routes } from '@quizer/config/app';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <h1 className='text-2xl font-bold'>Quizer</h1>
      <nav className='space-x-4'>
        {[
          { href: Routes.home, title: 'Home' },
          { href: Routes.singleChoiceQuiz, title: 'Single option test' },
        ].map(({ href, title }) => (
          <Link key={href} href={href} className='hover:underline'>
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
