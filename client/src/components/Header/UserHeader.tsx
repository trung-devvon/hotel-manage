import { menuCategories } from '@utils/constans'
import React, { memo } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'

const UserHeader = () => {
  const location = useLocation()
  return (
    <div className={clsx('bg-main-500 flex justify-center', menuCategories.find((el) => '/' +el.path === location.pathname) && 'h-[240px]')}>
      <div className='flex flex-col gap-4 w-main'>
        <h3 className='text-white text-4xl font-bold'>
          {menuCategories.find((el) => `/${el.path}` === location?.pathname)?.header}
        </h3>
        <p className='text-lg text-gray-300'>
          {menuCategories.find((el) => `/${el.path}` === location?.pathname)?.subHeader}
        </p>
      </div>
    </div>
  )
}

export default memo(UserHeader)
