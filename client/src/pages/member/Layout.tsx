import { MemberSidebar } from '@components/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MemberLayout = () => {
  return (
    <div className='grid w-full grid-cols-10 gap-3 h-screen bg-slate-50 p-3'>
      <div className='col-span-2 w-full max-h-screen overflow-y-auto rounded-md bg-white shadow-1'>
        <MemberSidebar />
      </div>
      <div className='col-span-8 w-full flex flex-col max-h-screen overflow-y-auto rounded-md bg-white shadow-1'>
        <div className='flex-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MemberLayout
