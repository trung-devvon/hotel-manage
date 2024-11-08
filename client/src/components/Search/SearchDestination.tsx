import { Title } from '@components/common'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { Button } from '@material-tailwind/react'
import { modal } from '@redux/slices/app.slice'
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { IDestinationsSelect } from '@interfaces/destination.interface'
import { useDebounce } from '@hooks/useDebounce'
import clsx from 'clsx'
import { IoSearchSharp } from 'react-icons/io5'
import { apiSearchHotelByKeyword } from '@api/hotel'

interface Props {
  getKeyword?: any
  getCodeDestination?: any
}
const SearchDestination = ({ getKeyword, getCodeDestination }: Props) => {
  const { register, watch, formState: isDirty, setValue, getValues } = useForm()
  const { destinations } = useAppSelector((state) => state.app)
  const [openList, setOpenList] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [hotels, setHotels] = useState<any[]>([])
  const [filteredHotels, setFilteredHotels] = useState<any>([])
  const [filteredDestinations, setFilteredDestinations] = useState<any>([])
  const keyword = watch('keyword')
  const destinationCode = watch('destinationCode')
  const debounceValue = useDebounce(keyword)

  const dispatch = useAppDispatch()

  const removeDiacritics = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenList(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    if (debounceValue.length > 1) {
      setOpenList(true)
      fetchHotels(debounceValue)
    } else {
      setHotels([])
    }
  }, [debounceValue])
  const fetchHotels = async (keyword: string) => {
    const response: any = await apiSearchHotelByKeyword(keyword)
    if (response.hotels.length > 0) {
      setHotels(response.hotels)
    }
    console.log('fetch hotel: ', response)
  }
  const handleSubmit = () => {
    getKeyword(`${getValues('keyword') || ''}`)
    getCodeDestination(`${getValues('destinationCode') || ''}`)
    dispatch(modal({ isShowModal: false, modalContent: null }))
  }
  useEffect(() => {
    if (keyword) {
      const normalizedKeyword = removeDiacritics(keyword.toLowerCase())
      setFilteredHotels(
        hotels?.filter((hotel) => removeDiacritics(hotel._source.name_normalized).includes(normalizedKeyword))
      )
      setFilteredDestinations(
        destinations?.filter((dest) => removeDiacritics(dest.name.toLowerCase()).includes(normalizedKeyword))
      )
      setOpenList(true)
    } else {
      setFilteredHotels([])
      setFilteredDestinations([])
      setOpenList(false)
    }
  }, [keyword, hotels, destinations])

  const highlightMatch = (text: string, keyword: string) => {
    if (!keyword) return text

    const cleanKeyword = keyword?.trim().replace(/\s+/g, ' ')
    if (cleanKeyword === '') return text

    const normalizedText = removeDiacritics(text)
    const normalizedKeyword = removeDiacritics(cleanKeyword)

    const regex = new RegExp(`(${normalizedKeyword})`, 'gi')
    const parts = normalizedText.split(regex)

    return parts.map((part, index) => {
      if (removeDiacritics(part.toLowerCase()) === normalizedKeyword.toLowerCase()) {
        return (
          <span key={index} className='font-bold'>
            {text.substring(normalizedText.indexOf(part), normalizedText.indexOf(part) + part.length)}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='lg:w-[50%] md:w-[60%] sm:w-[80%] max-h-[70%] flex flex-col h-full overflow-y-auto bg-white rounded-md'
    >
      <Title textSize='text-2xl' line={true}>
        Tìm tên khách sạn hoặc chọn địa điểm muốn đến
      </Title>
      <div
        className={clsx(
          'flex flex-col mx-auto w-4/5 overflow-hidden h-[400px] mt-2 rounded-md',
          openList && 'shadow-sm border'
        )}
      >
        <input hidden {...register('destinationCode')} />
        <div className='flex-[10] relative'>
          <input
            autoComplete='false'
            onFocus={() => setOpenList(true)}
            maxLength={50}
            placeholder='Nhập vào đây...'
            {...register('keyword')}
            className={clsx('w-full px-2 py-2 focus:outline-none', !openList && 'border border-teal-500 rounded-md')}
          />
          <div className='absolute right-1 p-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white'>
            <IoSearchSharp size={18} />
          </div>
        </div>
        <div className='bg-white flex-[90] h-full overflow-y-auto scrollbar-admin' ref={dropdownRef}>
          {openList && keyword?.trim().length > 0 && (
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '380px',
                display: 'inline-block'
              }}
              className='mx-2 my-1 text-sm text-gray-400 px-3'
            >
              Kết quả tìm kiếm cho: {keyword}
            </span>
          )}
          {openList &&
            filteredHotels?.map((hotel: any) => (
              <div
                key={hotel._id}
                onClick={() => {
                  setOpenList(false)
                  setValue('keyword', hotel._source.name)
                }}
                className='hover:bg-teal-500 hover:text-white cursor-pointer mx-2 my-1 rounded-md'
              >
                <p className='text-md px-3 py-2 my-1'>{highlightMatch(hotel._source.name, keyword)}</p>
              </div>
            ))}
          {openList &&
            filteredDestinations.map((el: IDestinationsSelect) => (
              <div
                key={el.code}
                onClick={() => {
                  setOpenList(false)
                  setValue('keyword', el.name)
                  setValue('destinationCode', el.code)
                }}
                className='hover:bg-teal-500 hover:text-white cursor-pointer mx-2 my-1 rounded-md'
              >
                <p className='text-md px-3 py-2 my-1'>{highlightMatch(el.name, keyword)}</p>
              </div>
            ))}
        </div>
      </div>
      <div className='px-4 py-6 flex gap-4 items-center justify-center'>
        <Button title='Hãy chọn địa chỉ cần tìm trước' disabled={!isDirty} onClick={handleSubmit}>
          Xác nhận
        </Button>
        <Button onClick={() => dispatch(modal({ isShowModal: false, modalContent: null }))}>Thoát</Button>
      </div>
    </div>
  )
}

export default SearchDestination
