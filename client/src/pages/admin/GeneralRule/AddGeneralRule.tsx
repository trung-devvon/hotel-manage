/* eslint-disable jsx-a11y/label-has-associated-control */
import { apiAddRules } from '@api/hotel'
import { Title } from '@components/common'
import { MarkdownEditor, TimePicker } from '@components/inputs'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { Button, Checkbox, Input, Radio } from '@material-tailwind/react'
import { modal } from '@redux/slices/app.slice'
import { paymethods } from '@utils/constans'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoWarningOutline } from 'react-icons/io5'

interface PayMethod {
  id: string
  name: string
  image: string
  value: string
}
interface PayloadState {
  timeGetRoomStart: string
  timeGetRoomEnd: string
  timeLeftRoomStart: string
  timeLeftRoomEnd: string
  childrenAndBed: string
  pets: 'ENABLE' | 'DISABLE' | string
  cashOnly: any[]
  cancellation: string
  ageRetriction: number | string
}

const AddGeneralRule = ({ data }: { data: any }) => {
  const [payload, setPayload] = useState<PayloadState>({
    timeGetRoomStart: '',
    timeGetRoomEnd: '',
    timeLeftRoomStart: '',
    timeLeftRoomEnd: '',
    childrenAndBed: '',
    ageRetriction: -1,
    pets: 'DISABLE',
    cashOnly: [],
    cancellation: ''
  })
  const { isLoading } = useAppSelector(state => state.app)
  useEffect(() => {
    if (data?.rules) {
      const { id, ...rest } = data.rules
      setPayload(rest)
    }
  }, [data])
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const isChecked = e.target.checked
    setPayload((prev) => {
      let cashOnlyArray = [...prev.cashOnly]

      if (isChecked) {
        // remove cash from array
        if (value === 'CASH' && cashOnlyArray.includes('NO_CASH')) {
          cashOnlyArray = cashOnlyArray.filter((item) => item !== 'NO_CASH')
        } else if (value === 'NO_CASH' && cashOnlyArray.includes('CASH')) {
          cashOnlyArray = cashOnlyArray.filter((item) => item !== 'CASH')
        }
        cashOnlyArray.push(value)
      } else {
        // rm from array if unChecked
        cashOnlyArray = cashOnlyArray.filter((item) => item !== value)
      }

      return { ...prev, cashOnly: cashOnlyArray }
    })
  }
  const handleSubmit = async () => {
    const payloadValues = Object.values(payload)
    // const invalid = payloadValues.some((el) => !el || (typeof el === 'object' && el.length === 0))
    const invalid = payloadValues.some((el) => {
      if (typeof el === 'string') {
        return (
          el.trim() === '' &&
          !['timeGetRoomStart', 'timeGetRoomEnd', 'timeLeftRoomStart', 'timeLeftRoomEnd'].includes(
            Object.keys(payloadValues).find((key: any) => payloadValues[key] === el)!
          )
        )
      }
      return false
    })
    if (!invalid) {
      const response: any = await apiAddRules({ ...payload, hotelId: data.id }, data.id)
      if (response.success) {
        toast.success(response.message)
        dispatch(modal({ isShowModal: false, modalContent: null }))
      } else {
        toast.error(response.message)
      }
    } else {
      console.log(invalid)
      toast((t) => (
        <span className='flex items-center gap-2'>
          <span className='text-yellow-700'>
            <IoWarningOutline size={24} />
          </span>
          <span>Không được bỏ trống</span>
          <Button size='sm' color='amber' onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </Button>
        </span>
      ))
    }
  }
  const dispatch = useAppDispatch()
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='shadow-md w-[90%] bg-white max-h-screen overflow-y-auto scrollbar-admin relative'
    >
      <div className='absolute top-5 right-5'>
        <Button
          onClick={() => dispatch(modal({ isShowModal: false, contentModal: null }))}
          className='capitalize'
          size='sm'
          color='teal'
        >
          Thoát
        </Button>
      </div>
      <Title>
        Thiết lập quy định chung
        <span className='text-main-600 ml-3 text-3xl'>{'#' + data?.name}</span>
      </Title>
      <div className='p-4'>
        <div className='grid grid-cols-2 gap-4 my-4'>
          <div className='flex flex-col gap-2 border rounded-md p-2'>
            <span className='font-semibold text-main-600 tracking-tight'>1. Thời gian nhận phòng</span>
            <div className='flex gap-4'>
              <TimePicker
                currentTime={payload.timeGetRoomStart}
                getTime={setPayload}
                id='timeGetRoomStart'
                label='Từ'
              />
              <TimePicker currentTime={payload.timeGetRoomEnd} getTime={setPayload} id='timeGetRoomEnd' label='Đến' />
            </div>
          </div>
          <div className='flex flex-col gap-2 border rounded-md p-2'>
            <span className='font-semibold text-main-600 tracking-tight'>2. Thời gian trả phòng</span>
            <div className='flex gap-4'>
              <TimePicker
                label='Từ'
                id='timeLeftRoomStart'
                currentTime={payload.timeLeftRoomStart}
                getTime={setPayload}
              />
              <TimePicker label='Đến' id='timeLeftRoomEnd' currentTime={payload.timeLeftRoomEnd} getTime={setPayload} />
            </div>
          </div>
        </div>
        <MarkdownEditor
          height={400}
          name='childrenAndBed'
          value={payload.childrenAndBed}
          title='3. Chính sách trẻ em và giường:'
          changeValue={setPayload}
        />
        <div className='flex flex-col gap-2 my-4'>
          <span className='font-semibold text-main-600 tracking-tight'>4. Chấp nhận thanh toán</span>
          <div className='grid grid-cols-3 gap-4'>
            {paymethods.map((el) => (
              <label
                className='flex items-center col-span-1 my-1 gap-2 p-3 border rounded-md cursor-pointer'
                key={el.id}
                htmlFor={el.value}
              >
                <Checkbox
                  className='payment'
                  onChange={(e) => handleChecked(e, el.value)}
                  checked={payload.cashOnly.some((item) => item === el.value)}
                  crossOrigin={'true'}
                  color='teal'
                  name=''
                  id={el.value}
                />
                <div className='text-sm cursor-pointer flex items-center gap-2'>
                  <img src={el.image} alt='logo' className='w-12 object-contain' />
                  <span>{el.name}</span>
                </div>
              </label>
            ))}
            <label
              className='flex items-center col-span-1 my-1 gap-2 p-3 border rounded-md cursor-pointer'
              htmlFor='cash'
            >
              <Checkbox
                onChange={(e) => handleChecked(e, 'CASH')}
                checked={payload.cashOnly.some((item) => item === 'CASH')}
                className='payment'
                crossOrigin={'true'}
                color='teal'
                id='cash'
              />
              <div className='text-sm cursor-pointer flex items-center gap-2'>
                <div className='w-16 text-[10px] ring-1 ring-green-700 flex items-center justify-center p-2 bg-green-700 text-white'>
                  Tiền mặt
                </div>
                <span>Chấp nhận thanh toán tiền mặt</span>
              </div>
            </label>
            <label
              className='flex items-center col-span-1 my-1 gap-2 p-3 border rounded-md cursor-pointer'
              htmlFor='noCash'
            >
              <Checkbox
                onChange={(e) => handleChecked(e, 'NO_CASH')}
                checked={payload.cashOnly.some((item) => item === 'NO_CASH')}
                className='payment'
                crossOrigin={'true'}
                color='teal'
                id='noCash'
              />
              <div className='text-sm cursor-pointer flex items-center gap-2'>
                <div className='w-16 text-[10px] ing-1 ring-gray-700 flex items-center justify-center p-2 bg-gray-700 text-white'>
                  No cash
                </div>
                <span>Không chấp nhận thanh toán tiền mặt</span>
              </div>
            </label>
          </div>
        </div>
        <MarkdownEditor
          height={400}
          value={payload.cancellation}
          title='5. Chính sách huỷ/ trả phòng:'
          changeValue={setPayload}
          name='cancellation'
        />
        <div className='my-4 flex gap-2'>
          <div className='flex flex-col gap-2'>
            <span className='text-md font-semibold capitalize ml-[2px] text-main-600 tracking-tight'>
              6. Giới hạn độ tuổi nhận phòng
            </span>
            <select
              value={payload.ageRetriction}
              onChange={(e) => setPayload((prev) => ({ ...prev, ageRetriction: +e.target.value }))}
              className='w-96 form-select'
            >
              <option value={-1}>Không có yêu cầu về độ tuổi khi nhận phòng</option>
              {Array.from(Array(24).keys()).map((num) => (
                <option value={num} key={num}>
                  {'Trên ' + num + ' tuổi'}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-md font-semibold capitalize ml-[2px] text-main-600 tracking-tight'>7. Vật nuôi</span>
            <select
              value={payload.pets}
              onChange={(e) => setPayload((prev) => ({ ...prev, pets: e.target.value }))}
              className='w-96 form-select'
            >
              <option value='DISABLE'>Vật nuôi không được phép.</option>
              <option value='ENABLE'>Cho phép đem vật nuôi.</option>
            </select>
          </div>
        </div>
      </div>
      <div className='flex my-8 justify-center'>
        <Button disabled={isLoading} onClick={handleSubmit} color='teal' size='lg'>
          Thêm quy tắc chung
        </Button>
      </div>
    </div>
  )
}

export default AddGeneralRule
