import React from 'react';
import Link from 'next/link';
import { SiPivotaltracker } from "react-icons/si";

const Navbar = () => {

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
            className='text-zinc-500 hover:text-zinc-900 transition-colors' 
            href={link.href}>{link.name}</Link>)}
        </ul>
    </nav>
  )
}

export default Navbar;