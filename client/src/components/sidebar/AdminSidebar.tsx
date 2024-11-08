import { Logo } from '@components/common'
import { menuAdmin } from '@utils/constans'
import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import { GoChevronDown, GoChevronRight } from 'react-icons/go'
import { Link, NavLink } from 'react-router-dom'

const isActiveStyle = 'bg-main-400 font-semibold'
const AdminSidebar = () => {
  const [openTabs, setOpenTabs] = useState<number[]>([])

  const handleTabs = (tabId: number) => {
    if (openTabs.includes(tabId)) {
      setOpenTabs(openTabs.filter((el) => el !== tabId))
    } else {
      setOpenTabs([...openTabs, tabId])
    }
  }
  return (
    <div className='flex flex-col items-center w-full'>
      <Link to='/' className='w-[210px] py-5 text-main-600'>
        <Logo bdColor='border-main-300' />
      </Link>
      <small className='text-[15px] uppercase font-bold text-main-600'>Admin Workspace</small>
      <div className='flex flex-col items-center px-3 my-5'>
        {menuAdmin.map((item) => (
          <Fragment key={item.id}>
            {item.type === 'SINGLE' && (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    'flex w-full items-center py-2 gap-2 px-3 my-1 rounded-lg text-main-600 hover:bg-main-400',
                    isActive && isActiveStyle
                  )
                }
                to={item.path!}
              >
                <span>{item.icon}</span>
                <span className='text-sm'>{item.name}</span>
              </NavLink>
            )}
            {item.type === 'PARENT' && (
              <div className='flex w-full flex-col'>
                <div
                  className={clsx(
                    'flex w-full items-center justify-between py-2 gap-2 px-3 my-1 rounded-lg text-main-600 hover:bg-main-400 cursor-pointer',
                    openTabs.includes(item.id) && 'font-bold'
                  )}
                  onClick={() => handleTabs(item.id)}
                >
                  <p className='flex items-center gap-2'>
                    <span>{item.icon}</span>
                    <span className='text-sm'>{item.name}</span>
                  </p>
                  {openTabs.includes(item.id) ? <GoChevronDown size={16} /> : <GoChevronRight size={16} />}
                </div>
                <div className={`ml-[10%]`}>
                  {openTabs.includes(item.id) &&
                    item.subs?.map((i) => (
                      <NavLink
                        key={i.id}
                        className={({ isActive }) =>
                          clsx(
                            'flex w-full items-center py-2 gap-2 px-3 my-1 rounded-lg text-main-600 hover:bg-main-400 ease-in-out',
                            isActive && isActiveStyle
                          )
                        }
                        to={i.path!}
                      >
                        <span>{i.icon}</span>
                        <span className='text-sm'>{i.name}</span>
                      </NavLink>
                    ))}
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
