'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiPivotaltracker } from "react-icons/si";
import classnames from 'classnames';

const Navbar = () => {  

    const currentPath = usePathname();

    const links = [
        {
        name: 'Dashboard',
        href: '/'
        },
        {
        name: 'Issues',
        href: '/issues'
        }
    ]  

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><SiPivotaltracker /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => <Link 
                key={link.href} 
                className={classnames({
                    'text-zinc-900' : link.href === currentPath,
                    'text-zinc-500' : link.href !== currentPath,
                    'hover:text-zinc-900 transition-colors' : true
                })}
                href={link.href}>{link.name}</Link>)}
            </ul>
        </nav>
  )
}

export default Navbar;