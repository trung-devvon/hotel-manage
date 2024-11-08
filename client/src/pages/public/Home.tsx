import { apiGetHotels } from '@api/hotel'
import { Slider, SliderHome, Title } from '@components/common'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'

import { IHotels } from '@interfaces/hotel.interface'
import React, { useEffect, useState } from 'react'

const DEFAULT_IMAGE =
  'https://img.freepik.com/premium-photo/world-tourism-daytravel-bag-with-world-landmark-holiday-tourismillustration_837518-9126.jpg?w=2000'
const Home = () => {
  const { hotelTypes, destinations } = useAppSelector((state) => state.app)
  const [bestHotels, setBestHotels] = useState<any>(null)
  const fetchBestHotels = async () => {
    const response: any = await apiGetHotels({ order: [['star', 'DESC']] })
    if (response?.success) {
      setBestHotels(response.hotels)
    }
  }
  useEffect(() => {
    fetchBestHotels()
  }, [])
  return (
    <>
      <div className='flex flex-col mx-auto lg:w-main md:w-[90%]'>
        <SliderHome subTitle='Các điểm đến phổ biến này có nhiều điều chờ đón bạn' title='Tìm theo loại chỗ nghỉ'>
          {hotelTypes?.map((item) => (
            <div key={item.code} className='w-full overflow-hidden flex cursor-pointer flex-col gap-2 px-2'>
              <img src={item.image} alt='destination' className='w-full object-cover rounded-lg h-[200px]' />

              <span className='flex flex-col'>
                <span className='font-semibold text-base'>{item.name}</span>
                <span className='text-xs'>{item.hotelData?.length + ' chỗ nghỉ'}</span>
              </span>
            </div>
          ))}
        </SliderHome>

         
        <div className='flex flex-col my-4 gap-2'>
          <Title line={false} px={false} className='border-none'>
            Địa điểm đến thịnh hành
          </Title>
          <small className='text-gray-500 text-lg font-normal -mt-3 mb-5'>
            &nbsp;Các lựa chọn phổ biến nhất cho du khách của Việt Nam
          </small>
          <div className='grid grid-cols-6 [&>*:nth-child(1)]:col-span-3 [&>*:nth-child(2)]:col-span-3 gap-6'>
            {destinations
              ?.filter((_, idx) => idx < 5)
              ?.map((el) => (
                <div className='relative w-full rounded-lg col-span-2 cursor-pointer' key={el.code}>
                  <img src={el.image} alt='logo' className='w-full h-[275px] rounded-lg object-cover' />
                  <div className='absolute rounded-lg inset-0 h-24 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-transparent'></div>
                  <span className='absolute z-10 rounded-lg h-24 inset-0 p-6 gap-2 flex items-center text-xl text-white font-bold'>
                    <span>{el.name}</span>
                    <img src='/vietnam.svg' alt='flag' className='w-10 h-6 object-cover' />
                  </span>
                </div>
              ))}
          </div>
          <Slider count={6} title='Khám phá Việt Nam'>
            {destinations?.map((el) => (
              <div className='flex flex-col gap-2 cursor-pointer' key={el.code}>
                <img src={el.image} alt='logo' className='w-full object-cover rounded-lg h-[120px]' />
                <span className='flex flex-col'>
                  <span className='font-semibold text-base'>{el.name}</span>
                </span>
              </div>
            ))}
          </Slider>
          <SliderHome>
            {bestHotels &&
              bestHotels?.rows?.map((el: IHotels) => (
                <div className='flex flex-col px-2' key={el.id}>
                  <img
                    src={el.images[0] || DEFAULT_IMAGE}
                    className='w-full object-cover rounded-lg h-[200px]'
                    alt='hotel'
                  />
                  <span className='flex flex-col mt-3'>
                    <span className='font-semibold text-base'>{el.name}</span>
                    <span className='text-sm line-clamp-1'>{el.address?.split(',')?.splice(-2)?.join(',')}</span>
                    <span className='text-sm line-clamp-1'>{el.star || 'Chưa đánh giá'}</span>
                  </span>
                </div>
              ))}
          </SliderHome>
        </div>
      </div>
    </>
  )
}

export default Home
