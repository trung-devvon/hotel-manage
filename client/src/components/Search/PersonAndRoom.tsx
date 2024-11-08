import React, { useEffect, useState } from 'react'
import Counter from './Counter'
import { Button } from '@material-tailwind/react'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { toggleSearchService } from '@redux/slices/app.slice'
import { useSearchParams } from 'react-router-dom'

interface PayloadType {
  adults: number
  kids: number
  rooms: number
}

interface Props {
  setValue: React.Dispatch<React.SetStateAction<PayloadType>>
}

const PersonAndRoom = ({ setValue }: Props) => {
  const [payload, setPayload] = useState<PayloadType>({
    adults: 2,
    kids: 0,
    rooms: 1
  })
  const [searchParams] = useSearchParams()
  const { personAndRoom } = useAppSelector((state) => state.app.searchServices)
  const dispatch = useAppDispatch()
  const handleFinish = () => {
    setValue(payload)
    dispatch(toggleSearchService({ personAndRoom: !personAndRoom }))
  }
  useEffect(() => {
    const adults = searchParams.get('adults')
    const kids = searchParams.get('kids')
    const rooms = searchParams.get('rooms')

    setPayload({
      adults: adults ? Math.min(Math.max(parseInt(adults, 10), 2), 10) : 2,
      kids: kids ? Math.min(Math.max(parseInt(kids, 10), 0), 10) : 0,
      rooms: rooms ? Math.min(Math.max(parseInt(rooms, 10), 1), 10) : 1
    })
  }, [searchParams])
  return (
    <>
      <div
        className='flex items-center justify-center cursor-pointer bg-white h-full w-full rounded-md p-4 gap-2'
        onClick={() => dispatch(toggleSearchService({ personAndRoom: !personAndRoom }))}
      >
        <p className='text-gray-500 border rounded flex-1 w-full flex justify-center p-2 text-lg'>
          {`${payload?.adults} 🧓 • ${payload?.kids} 👶🏻 • ${payload?.rooms} 🛏️`}
        </p>
        <span>👨‍👩‍👦‍👦</span>
      </div>
      {personAndRoom && (
        <div className='flex w-[300px] flex-col gap-3 absolute bg-white top-full z-[100] p-4 shadow-lg rounded-lg m-1'>
          <div className='flex justify-between items-center gap-6'>
            <label className='flex-1' htmlFor='person'>
              Người lớn
            </label>
            <div className='flex-1'>
              <Counter min={1} max={10} setPayload={setPayload} id='adults' counter={payload.adults} />
            </div>
          </div>
          <div className='flex justify-between items-center gap-6'>
            <label className='flex-1' htmlFor='person'>
              Trẻ em
            </label>
            <div className='flex-1'>
              <Counter min={0} max={10} setPayload={setPayload} id='kids' counter={payload.kids} />
            </div>
          </div>
          <div className='flex justify-between items-center gap-6'>
            <label className='flex-1' htmlFor='person'>
              Phòng
            </label>
            <div className='flex-1'>
              <Counter min={1} max={10} setPayload={setPayload} id='rooms' counter={payload.rooms} />
            </div>
          </div>
          <Button onClick={handleFinish}>Xác nhận</Button>
        </div>
      )}
    </>
  )
}

export default PersonAndRoom
