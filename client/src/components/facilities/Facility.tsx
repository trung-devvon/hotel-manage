import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { IFacility } from '@interfaces/facility.interface'
import { Checkbox, List, ListItem } from '@material-tailwind/react'
import { removeFacilities, updateFacilities } from '@redux/slices/hotel.slice'
import { createSlug } from '@utils/fn'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

interface Props {
  data: IFacility
  facilities: any
}

const Facility = ({ data }: Props) => {
  const [showChild, setShowChild] = useState(false)
  const { isLoading } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isLoading) {
      setShowChild(false)
    }
  }, [isLoading])
  const getHeight = () => {
    const subsLength = data?.subs?.length || 0
    if (subsLength < 3) {
      return 'h-[200px]'
    }
    return 'h-[300px]'
  }
  return (
    <div className='flex flex-col'>
      <div
        onClick={() => setShowChild((prev) => !prev)}
        className='flex justify-between items-center px-4 py-3 my-2 bg-gray-100 rounded-md text-main-500 shadow-lg cursor-pointer hover:bg-gray-200'
      >
        <div className='flex items-center gap-3 h-[40px]'>
          <img className='w-[24px] h-[24px] object-cover' src={`/Facilities/${data.icon}`} alt='' />
          <span className='hover:text-main-600 transition-colors duration-300 text-sm'>{data.value}</span>
        </div>
        <span>{showChild ? <FiMinus /> : <FiPlus />}</span>
      </div>
      <List
        className={clsx(
          'flex flex-col scrollbar-admin scroll-smooth',
          !showChild && 'scale-to-0',
          showChild && 'overflow-y-scroll',
          showChild && getHeight()
        )}
      >
        {data?.subs?.map((el) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={el} htmlFor={createSlug(el)}>
            <ListItem
              className={clsx(
                'flex gap-2 items-center',
                !showChild && 'scale-out-ver-top',
                showChild && 'scale-in-ver-top'
              )}
            >
              <Checkbox
                onChange={(e: any) =>
                  e.target.checked
                    ? dispatch(updateFacilities({ id: data.id, sub: el }))
                    : dispatch(removeFacilities({ id: data.id, sub: el }))
                }
                color='teal'
                id={createSlug(el)}
                crossOrigin={'true'}
                label={el}
              />
            </ListItem>
          </label>
        ))}
      </List>
    </div>
  )
}

export default Facility
