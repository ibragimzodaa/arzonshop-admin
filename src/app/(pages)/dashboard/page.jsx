"use client"
import Section1 from '@/components/dashboard/section1'
import TableDemo from '@/components/dashboard/section2'
import { Table } from '@/components/ui/table'
import dynamic from 'next/dynamic'
import React from 'react'
const Apexchart = dynamic(() => import('@/components/apexchart/apexchart'), { ssr: false });

export default function Dashboard() {
  return (
    <div className='p-[40px]'>
      <h1 className='text-[25px] font-semibold mb-[30px]'>Dashboard</h1>
      <div className='flex '>
      <div className='mr-[70px]'>
      <Section1/>
      <Apexchart/>
      </div>
      <TableDemo className="ml-[50px]"/>
      </div>
    </div>
  )
}
