import News from '@/components/news-components/news';
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const NewsPage = async () => {
  
  const { userId } = auth();
  
  if(!userId) redirect("/sign-in")
    
    const news = await prisma.news.findMany({
      where: { userId }
    })

  return (
    <div className=' flex gap-x-5'>
      {news.map(news => (
        <News key={news.id} news={news}/>
      ))}
      {news.length === 0 && (
        <div className=' flex items-center mx-auto h-screen'>
          {"You don't have any news yet. Please create one!"}
        </div>
      )}
    </div>
  )
}

export default NewsPage