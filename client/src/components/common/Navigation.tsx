import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Logo } from '.'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { Avatar, Button, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { pathAdmin, pathMember, pathUser } from '@utils/path'
import { appRole, menuCategories } from '@utils/constans'
import defaultAvatar from '@assets/avatar.png'
import { Icons } from '@utils/icons'
import { logout } from '@redux/slices/user.slice'

const activeCss = 'border border-white-07 rounded-full bg-second-10'
const notActiveCss = 'flex items-center gap-[5px] text-md px-4 py-2 hover:bg-second-10 hover:rounded-full'
const Navigation = () => {
  const { current } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  return (
    <div className='w-full text-white bg-main-500 flex justify-center py-6 h-140px'>
      <div className='w-main'>
        <div className='flex items-center justify-between'>
          <div className='w-200'>
            <NavLink to='/'>
              <Logo bdColor='border-white' />
            </NavLink>
          </div>
          {!current && (
            <div className='flex gap-2'>
              <Link state={'LOGIN'} to={pathUser.AUTH}>
                <Button color='white' className='text-main-500'>
                  Đăng Nhập
                </Button>
              </Link>
              <Link state={'REGISTER'} to={pathUser.AUTH}>
                <Button variant='outlined' color='white'>
                  Đăng Ký
                </Button>
              </Link>
            </div>
          )}
          {current && (
            <div className='flex'>
              <Popover
                placement={'bottom'}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 }
                }}
              >
                <PopoverHandler>
                  <Button className='bg-main-300'>
                    <div className='flex items-center gap-2'>
                      <Avatar size='xs' src={current?.avatar || defaultAvatar} />
                      <p>
                        <span>Welcome, </span>
                        <span>{current?.name}</span>
                      </p>
                    </div>
                  </Button>
                </PopoverHandler>
                <PopoverContent className='w-[220px]'>
                  <Link
                    className='w-full text-slate-700 flex gap-2 rounded-lg items-center py-3 px-2 hover:bg-gray-100'
                    to={pathMember.PERSONAL}
                  >
                    <Icons.AiOutlineUser size={18} />
                    <span className='text-[15px]'>Thông tin cá nhân</span>
                  </Link>
                  {/* {current?.Role?.code === appRole.member && ( */}
                  <Link
                    className='w-full text-slate-700 flex gap-2 rounded-lg items-center py-3 px-2 hover:bg-gray-100'
                    to={pathMember.MEMBER}
                  >
                    <Icons.BsPersonWorkspace size={18} />
                    <span className='text-[15px]'>Member Workspace</span>
                  </Link>
                  {/* )} */}
                  {current?.Role?.code === appRole.admin && (
                    <Link
                      className='w-full text-slate-700 flex gap-2 rounded-lg items-center py-3 px-2 hover:bg-gray-100'
                      to={pathAdmin.ADMIN}
                    >
                      <Icons.BsPersonWorkspace size={18} />
                      <span className='text-[15px]'>Admin Workspace</span>
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className='w-full text-slate-700 flex gap-2 rounded-lg items-center py-3 px-2 hover:bg-gray-100 cursor-pointer'
                  >
                    <Icons.RiLogoutCircleLine size={18} />
                    <span className='text-[15px]'>Đăng Xuất</span>
                  </span>
                </PopoverContent>
              </Popover>
              <div className='user-welcome'></div>
            </div>
          )}
        </div>
        <div className='flex items-center gap-5 py-3 my-5'>
          {menuCategories.map((el) => (
            <NavLink
              className={({ isActive }) => (isActive ? `${activeCss} ${notActiveCss}` : notActiveCss)}
              key={el.id}
              to={el.path}
            >
              <span>{el.icon}</span>
              <span>{el.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navigation
