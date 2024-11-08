import clsx from 'clsx'
import React from 'react'

interface Props {
  children: React.ReactNode
}
const ValidText = ({ children }: Props) => {
  return (
    <small
      className={clsx('text-red-500 min-h-[20px] py-[2px] rounded-sm bg-red-50 inline-block', children && 'ml-1 px-1')}
    >
      {children}
    </small>
  )
}

export default ValidText
