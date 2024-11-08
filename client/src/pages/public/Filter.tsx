import { apiGetHotels } from '@api/hotel'
import { FilterItem } from '@components/Filter'
import { useAppSelector } from '@hooks/useApp'
import { Button } from '@material-tailwind/react'
import { allPets, paymethods, stars } from '@utils/constans'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getTodayAndTomorrow, getDaysOfRange } from '@utils/fn'
import { Pagination } from '@components/Pagination'

const Filter = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm()
  const [data, setData] = useState<{ rows: any; count: number } | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }
  const getHotelData = async (params: any) => {
    const { keyword, ...allParams } = params

    if (allParams?.destinationCode) {
      const response: any = await apiGetHotels(allParams)
      console.log('response hotels with destinationCode: ', response)
      if (response.success) setData(response.hotels)
    } else {
      const response: any = await apiGetHotels(params)
      console.log('response hotels with keyword: ', response)
      if (response.success) setData(response.hotels)
    }
  }
  const { hotelTypes } = useAppSelector((state) => state.app)
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    const { keyword, destinationCode, ...finalParams } = params
    getHotelData({ keyword, destinationCode })
    console.log(params)
  }, [searchParams])

  return (
    <div className='w-main mx-auto grid grid-cols-10 py-4 gap-4'>
      <div className='col-span-2 w-full flex flex-col'>
        <div className='relative w-full rounded-md'>
          <img className='w-full object-cover h-[150px] rounded-md' src='src/assets/map.jpg' alt='' />
          <div className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]'>
            <Button color='white' size='sm'>
              Hiển thị trên map
            </Button>
          </div>
        </div>
        <FilterItem
          label='Loại chỗ nghỉ'
          subTitle='lựa chọn nhu cầu về loại chỗ nghỉ của bạn'
          options={hotelTypes}
          id='hotelTypes'
        />
        <FilterItem
          label='Xếp hạng'
          subTitle='Bao gồm xếp hạng sao và các hình thức xếp hạng khác'
          options={stars}
          id='star'
        />
        <FilterItem
          options={paymethods}
          label='Hình thức thanh toán'
          id='cashOnly'
          //   setValue={(val) => setCustomValue('cashOnly', val)}
          cashOnly
        />
        <FilterItem
          options={allPets}
          label='Thú cưng'
          id='pets'
          subTitle='Yêu cầu củ chủ chỗ nghỉ về việc mang theo thú cưng'
          //   setValue={(val) => setCustomValue('pets', val)}
        />
      </div>
      <div className='col-span-8 w-full'>
        <h1 className='text-2xl font-bold'>Tìm kiếm: {`${searchParams.get('keyword') || ''} `}</h1>
        <div className='my-3'>sap xep theo</div>
        <div className='flex flex-col gap-3'></div>
        <div className='my-6 flex justify-end items-center w-full'>
          <Pagination totalCount={data?.count || 0} />
        </div>
      </div>
    </div>
  )
}

export default Filter
