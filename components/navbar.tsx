import React from 'react'
import { MainNav } from './main-nav'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {

  

  return (
    <nav className=' border-b'>
      <div className=' flex h-16 items-center px-4'>
        <MainNav />
        <div className=' ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/'/>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
