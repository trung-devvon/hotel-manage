import React from 'react'
import { FaStar } from 'react-icons/fa'

interface Props {
  rating: number
}

const Stars: React.FC<Props> = ({ rating }) => {
  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1
        return (
          <FaStar key={index} className={`w-6 h-6 ${starNumber <= rating ? 'text-orange-400' : 'text-gray-300'}`} />
        )
      })}
    </div>
  )
}

export default Stars
