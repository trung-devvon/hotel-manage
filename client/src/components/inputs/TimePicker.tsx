import React, { useEffect, useState } from 'react'

interface ITimePicker {
  label?: string
  getTime?: React.Dispatch<React.SetStateAction<any>>
  id?: string
  currentTime?: string | number
}
const TimePicker = ({ label, getTime, id, currentTime = 0 }: ITimePicker) => {
  const [time, setTime] = useState<any>({ hour: '', min: '' })
  useEffect(() => {
    getTime && getTime((prev: any) => ({ ...prev, [id || '']: +time.hour + Math.round(time.min / 0.6) / 100 }))
  }, [time])
  return (
    <div className='flex flex-col'>
      {label && <span className='font-medium'>{label}</span>}
      <div className='flex gap-3 items-center'>
        <select
          value={Math.floor(+currentTime) || time.hour}
          onChange={(e) => setTime((prev: any) => ({ ...prev, hour: e.target.value }))}
          className='form-select min-w-[100px]'
        >
          <option value='' disabled>
            Giờ
          </option>
          {Array.from(Array(24).keys()).map((el) => (
            <option key={el + 1000} value={el}>
              {el + ' giờ'}
            </option>
          ))}
        </select>
        <div className='font-bold'>:</div>
        <div className='flex w-full max-w-[8rem]'>
          <select
            className='form-select min-w-[100px]'
            value={(+currentTime - Math.floor(+currentTime)) * 60 || time.min}
            onChange={(e) => setTime((prev: any) => ({ ...prev, min: e.target.value }))}
          >
            <option value='' disabled>
              Phút
            </option>
            {Array.from(Array(60).keys())
              .filter((num) => num % 15 === 0)
              .map((minute: any) => (
                <option key={minute} value={minute}>
                  {minute + ' phút'}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default TimePicker
