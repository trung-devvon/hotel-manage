import { ValidText } from '@components/common'
import { DatePickerCustom } from '@components/inputs'
import { useAppDispatch } from '@hooks/useApp'
import { Button, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdCardTravel } from 'react-icons/md'
import { createSearchParams, useNavigate, useSearchParams, useParams, useLocation } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'
import { modal } from '@redux/slices/app.slice'
import SearchDestination from './SearchDestination'
import toast from 'react-hot-toast'
import { pathUser } from '@utils/path'
import { getTodayAndTomorrow, getDaysOfRange } from '@utils/fn'
import PersonAndRoom from './PersonAndRoom'

interface FormData {
  dateRange: {
    startDate: Date | null
    endDate: Date | null
  }
  keyword?: string
  personAndRooms?: any
}

const SearchBar = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      dateRange: { startDate: null, endDate: null }
    }
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [destinationCode, setDestinationCode] = useState('')
  const dateRange = watch('dateRange')
  const personAndRooms = watch('personAndRooms')
  const [searchParams] = useSearchParams()

  // search params
  const hasKeyword = searchParams.has('keyword')
  const getKeyword = searchParams.get('keyword')
  //
  const hasDestination = searchParams.has('destinationCode')
  const getDestination = searchParams.get('destinationCode')

  // custom value from date and peopleRooms
  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    console.log(id, value)
  }
  const handleSearchStart = () => {
    if (!keyword && !destinationCode) return
    console.log(destinationCode, dateRange)
    const params: any = {}
    if (keyword) params.keyword = keyword
    if (destinationCode) params.destinationCode = destinationCode
    if (dateRange.startDate && dateRange.endDate) {
      params.startDate = dateRange.startDate
      params.endDate = dateRange.endDate
    } else {
      params.startDate = getTodayAndTomorrow().startDate
      params.endDate = getTodayAndTomorrow().endDate
    }

    if (personAndRooms?.adults && personAndRooms?.kids && personAndRooms?.rooms) {
      params.adults = personAndRooms.adults
      params.kids = personAndRooms.kids
      params.rooms = personAndRooms.rooms
    } else {
      params.adults = 2
      params.kids = 0
      params.rooms = 1
    }
    if (Object.keys(params).length === 0) toast('Hãy chọn bộ lọc bạn muốn tìm')
    else {
      navigate({
        pathname: pathUser.SEARCH,
        search: createSearchParams(params).toString()
      })
    }
  }
  useEffect(() => {
    if (hasKeyword) {
      setKeyword(getKeyword!)
    }
    if (hasDestination) {
      setDestinationCode(getDestination!)
    }
  }, [location])
  return (
    <div className='gap-1 w-main bg-main-400 shadow-lg mx-auto p-2 grid grid-cols-12 rounded-md mt-[-45px]'>
      <form className='col-span-11 grid grid-cols-12 gap-1'>
        <div className='col-span-5 p-3 shadow-md border rounded-lg bg-main-500'>
          <Button
            className='w-full h-full flex justify-center items-center border-2 text-gray-500 font-light'
            color='white'
            size='sm'
            onClick={() =>
              dispatch(
                modal({
                  isShowModal: true,
                  modalContent: (
                    <SearchDestination
                      getKeyword={(val: any) => setKeyword(val)}
                      getCodeDestination={(value: any) => setDestinationCode(value)}
                    />
                  )
                })
              )
            }
          >
            <span className='w-1/12'>
              <MdCardTravel size={20} />
            </span>
            <p className='mt-1 w-11/12 truncate text-base font-[400] capitalize'>{keyword || 'Bạn muốn đến đâu'}</p>
          </Button>
        </div>
        <div className='col-span-4 bg-main-500 p-3 shadow-md border rounded-lg flex items-center justify-center'>
          <DatePickerCustom setValue={(value: any) => setValue('dateRange', value)} dateRange={dateRange} />
        </div>
        <div className='col-span-3 bg-main-500 p-3 shadow-md border rounded-lg flex items-center justify-center relative'>
          <PersonAndRoom setValue={(value) => setCustomValue('personAndRooms', value)} />
        </div>
      </form>
      <Button onClick={handleSearchStart} className='col-span-1 border bg-main-600 flex items-center justify-center'>
        <IoSearchSharp size={22} />
      </Button>
    </div>
  )
}

export default SearchBar
