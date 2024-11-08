import { modal } from '@redux/slices/app.slice'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => dispatch(modal({ isShowModal: false, modalContent: null }))}
      className='w-full h-full flex justify-center items-center overflow-hidden'
    >
      {children}
    </div>
  )
}

export default memo(Modal)
