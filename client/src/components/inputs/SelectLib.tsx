import React from 'react'
import Select from 'react-select'
import clsx from 'clsx'

interface IProps {
  placeholder: string
  onChange?: any
  options: any[]
  value?: string
  className?: string
}

const SelectLib = ({ placeholder, onChange, options = [], value, className }: IProps) => {
  return (
    <Select
      placeholder={placeholder}
      onChange={(val) => onChange(val)}
      value={value}
      options={options}
      isClearable
      isSearchable
      formatOptionLabel={(option: any) => (
        <div className='flex items-center gap-2'>
          <div>{option.name}</div>
        </div>
      )}
      classNames={{
        control: () => clsx('p-2 border-2', className),
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
    />
  )
}

export default SelectLib
