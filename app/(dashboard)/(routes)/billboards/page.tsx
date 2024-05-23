import { format } from 'date-fns'
import { BillboardColumn } from './components/columns'
import BillboardClient from './components/client'
import prisma from '@/lib/prisma'

const BillboardPage = async ({
  params
}: { params: {storeId : string}}) => {

  const billboards = await prisma.billboard.findMany()

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  )
}

export default BillboardPage