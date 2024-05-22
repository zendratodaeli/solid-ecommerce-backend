import { News as NewsModel } from '@prisma/client'
import React from 'react'

interface NewsProps {
  news: NewsModel
}

const News = ({ news }: NewsProps) => {
  
  return (
    <div className=' flex flex-col'>
        <p>{news.title}</p>
        <p>{news.content}</p>
    </div>
  )
}

export default News
