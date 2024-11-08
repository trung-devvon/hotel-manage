import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='py-8'>
      <div className='bg-main-500 py-10'>
        <div className='w-main mx-auto'>
          <div className='flex justify-center'>
            <Button className='my-5' variant='outlined' color='white'>
              Đăng chỗ nghỉ của bạn
            </Button>
          </div>
          <ul className='flex justify-center items-center gap-3'>
            <li>
              <Link className='text-white border-b opacity-80 hover:opacity-100' to={''}>
                Phiên bản di động
              </Link>
            </li>
            <li>
              <Link className='text-white border-b opacity-80 hover:opacity-100' to={''}>
                Quản lý các đặt phòng của bạn
              </Link>
            </li>
            <li>
              <Link className='text-white border-b opacity-80 hover:opacity-100' to={''}>
                Dịch vụ khách hàng
              </Link>
            </li>
            <li>
              <Link className='text-white border-b opacity-80 hover:opacity-100' to={''}>
                Trở thành đối tác phân phối
              </Link>
            </li>
            <li>
              <Link className='text-white border-b opacity-80 hover:opacity-100' to={''}>
                Cho doanh nghiệp
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='bg-white w-main mx-auto'>
        <p className='text-[12px] text-gray-700 text-center my-6'>Các dịch vụ liên quan</p>
        <ul className='flex justify-center items-center gap-3'>
          <li>
            <Link to=''>
              <img
                alt=''
                src='https://cf.bstatic.com/static/img/tfl/group_logos/logo_booking/27c8d1832de6a3123b6ee45b59ae2f81b0d9d0d0.png'
              />
            </Link>
          </li>
          <li>
            <Link to=''>
              <img
                alt=''
                src='https://cf.bstatic.com/static/img/tfl/group_logos/logo_priceline/f80e129541f2a952d470df2447373390f3dd4e44.png'
              />
            </Link>
          </li>
          <li>
            <Link to=''>
              <img
                alt=''
                src='https://cf.bstatic.com/static/img/tfl/group_logos/logo_kayak/83ef7122074473a6566094e957ff834badb58ce6.png'
              />
            </Link>
          </li>
          <li>
            <Link to=''>
              <img
                alt=''
                src='https://cf.bstatic.com/static/img/tfl/group_logos/logo_agoda/1c9191b6a3651bf030e41e99a153b64f449845ed.png'
              />
            </Link>
          </li>
          <li>
            <Link to=''>
              <img
                alt=''
                src='https://cf.bstatic.com/static/img/tfl/group_logos/logo_opentable/a4b50503eda6c15773d6e61c238230eb42fb050d.png'
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
