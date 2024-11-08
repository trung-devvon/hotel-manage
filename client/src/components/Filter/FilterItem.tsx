import { Checkbox } from '@material-tailwind/react'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface IProps {
  id?: string
  label?: string
  subTitle?: string
  options?: {
    id: string
    name: string
  }[]
  cashOnly?: boolean
  setValue?: Dispatch<SetStateAction<null | string>>
}
const FilterItem = ({ id, label, subTitle, options = [], cashOnly, setValue }: IProps) => {
  const [userChoose, setUserChoose] = useState([])
  return (
    <div className='border rounded-md p-3'>
      <label htmlFor={id}>{label}</label>
      <small className='text-[10px] text-gray-500 block font-thin italic'>{subTitle}</small>
      {options.map((item) => (
        <div className='flex' key={item.id}>
          <Checkbox color='teal' id={item.id} value={item.id} crossOrigin={'true'} label={item.name} />
        </div>
      ))}
      {cashOnly && (
        <>
          <Checkbox color='teal' id='CASH' value='CASH' crossOrigin={'true'} label='Tiền mặt' />
          <Checkbox color='teal' id='NO_CASH' value='NO_CASH' crossOrigin={'true'} label='Không tiền mặt' />
        </>
      )}
    </div>
  )
}

export default FilterItem
