"use client"

import React, { useEffect, useState } from 'react'
import { MainNav } from './main-nav'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import AddNewsForm from './news-components/add-news-form'

const Navbar = () => {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted) {
    return null;
  }
  
  return (
    <nav className=' border-b'>
      <div className=' flex h-16 items-center px-4'>
        <MainNav />
        <div className=' ml-auto flex items-center space-x-4'>
          <Button onClick={() => setShowAddEditNoteDialog(true)}>
            <Plus size={20} className="mr-2"/>
            Add Note
          </Button>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/'/>
        </div>
      </div>
      <AddNewsForm open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog} />
    </nav>
  )
}

export default Navbar
