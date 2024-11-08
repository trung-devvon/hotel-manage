import { AdminSidebar } from '@components/sidebar'
import { useAppSelector } from '@hooks/useApp'
import { appRole } from '@utils/constans'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const { current } = useAppSelector((state) => state.user)
  if (current?.Role.code !== appRole.admin) return <Navigate to={'/'} />
  return (
    <div className='w-full grid grid-cols-10 gap-3 h-screen bg-slate-50 p-3'>
      <div className='col-span-2 w-full max-h-screen overflow-y-auto rounded-md bg-white shadow-1'>
        <AdminSidebar />
      </div>
      <div className='col-span-8 w-full flex flex-col max-h-screen overflow-y-auto rounded-md bg-white shadow-1 scrollbar-admin'>
        <div className='flex-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
