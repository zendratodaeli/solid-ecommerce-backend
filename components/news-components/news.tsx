"use client"

import { News as NewsModel } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import AddNewsForm from './add-news-form'

interface NewsProps {
  news: NewsModel
}

const News = ({ news }: NewsProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  return (
    <>
      <div 
        className=' flex flex-col'
        onClick={() => setShowEditDialog(true)}
      >
          <p>{news.title}</p>
          <p>{news.content}</p>
          
      </div>
      <AddNewsForm
        open={showEditDialog}
        setOpen={setShowEditDialog}
        newsToEdit={news}
      />
    </>
  )
}

export default News
