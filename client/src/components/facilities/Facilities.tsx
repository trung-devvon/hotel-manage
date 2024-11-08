import { getFacilities } from '@api/facility'
import { IFacility } from '@interfaces/facility.interface'
import clsx from 'clsx'
import React, { HTMLProps, useEffect, useState } from 'react'
import { Facility } from '.'

interface Props extends HTMLProps<HTMLDivElement> {
  label: string
  id?: string
}

const Facilities = ({ label, id, className }: Props) => {
  const [facilities, setFacilities] = useState<IFacility[]>([])
  // const [chooseFacilities, setChooseFacilities] = useState<IFacility[]>([])
  const fetchFacilities = async () => {
    const response: any = await getFacilities()
    if (response?.success) setFacilities(response.facilities)
  }
  useEffect(() => {
    fetchFacilities()
  }, [])
  // console.log(facilities)
  return (
    <div className={clsx('flex flex-col gap-1 mt-3', className)}>
      <label className='text-md capitalize ml-[2px] text-main-600 tracking-tight' htmlFor={id}>
        {label}
      </label>
      <div className='flex gap-4'>
        <div className='flex flex-col flex-1'>
          {facilities.map(
            (el, index) =>
              index % 4 === 0 && (
                <div key={el.id} className='w-full'>
                  <Facility data={el} facilities={facilities} />
                </div>
              )
          )}
        </div>
        <div className='flex flex-col flex-1'>
          {facilities.map(
            (el, index) =>
              index % 4 === 1 && (
                <div key={el.id} className='w-full'>
                  <Facility data={el} facilities={facilities} />
                </div>
              )
          )}
        </div>
        <div className='flex flex-col flex-1'>
          {facilities.map(
            (el, index) =>
              index % 4 === 2 && (
                <div key={el.id} className='w-full'>
                  <Facility data={el} facilities={facilities} />
                </div>
              )
          )}
        </div>
        <div className='flex flex-col flex-1'>
          {facilities.map(
            (el, index) =>
              index % 4 === 3 && (
                <div key={el.id} className='w-full'>
                  <Facility data={el} facilities={facilities} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default Facilities
