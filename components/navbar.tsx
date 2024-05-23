import { UserButton } from '@clerk/nextjs'
import React, { ReactHTMLElement } from 'react'
import { MainNav } from './main-nav'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { StoreIcon } from 'lucide-react'

export default async function Navbar () {

  return (
    <div className=' border-b'>
      <div className=' flex h-16 items-center px-4'>
        <StoreIcon/>
        <MainNav className=' mx-6'/>
        <div className=' ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/sign-in'/>
        </div>
      </div>
    </div>
  )
}
