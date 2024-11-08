import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

interface Props {
  counter: number
  setPayload: any
  id: string
  min?: number // Thêm min
  max?: number // Thêm max
}

const Counter = ({ counter = 0, setPayload, id, min = 0, max = 10 }: Props) => {
  const handleCounter = (flag: string) => {
    if (flag === 'MINUS') {
      // Không giảm dưới giá trị min
      if (counter > min) {
        setPayload((prev: any) => ({ ...prev, [id]: counter - 1 }))
      }
    }

    if (flag === 'PLUS') {
      // Không tăng quá giá trị max
      if (counter < max) {
        setPayload((prev: any) => ({ ...prev, [id]: counter + 1 }))
      }
    }
  }

  return (
    <div className='w-full h-[42px] flex items-center justify-center border rounded-md text-main-500'>
      <span
        onClick={() => handleCounter('MINUS')}
        className={`flex-1 h-full text-lg flex items-center justify-center ${
          counter === min ? 'cursor-not-allowed text-gray-300' : 'hover:bg-main-400 cursor-pointer'
        }`}
      >
        <AiOutlineMinus />
      </span>
      <span className='flex-1 select-none h-full text-lg flex items-center justify-center'>{counter}</span>
      <span
        onClick={() => handleCounter('PLUS')}
        className={`flex-1 h-full text-lg flex items-center justify-center ${
          counter === max ? 'cursor-not-allowed text-gray-300' : 'hover:bg-main-400 cursor-pointer'
        }`}
      >
        <AiOutlinePlus />
      </span>
    </div>
  )
}

export default Counter
