import { useAppSelector } from '@hooks/useApp'
import defaultAvatar from '@assets/default-avt.png'
import React from 'react'

const MemberSidebar = () => {
  const { current } = useAppSelector((state) => state.user)
  return (
    <div className='w-full'>
      <div className='bg-main-400 flex flex-col items-center justify-center py-4 rounded-sm'>
        <img className='w-24 h-24 object-cover rounded-full' src={current?.avatar || defaultAvatar} alt='avatar' />
        <h3 className='text-xl text-main-600 font-semibold uppercase my-4'>{current?.name || 'anonymous'}</h3>
        <p className='flex'>
          <span>
            USER_ID: <span>{current?.id ? parseInt(current?.id, 16) : ''}</span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default MemberSidebar
