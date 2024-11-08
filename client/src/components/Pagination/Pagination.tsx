import usePagination from '@hooks/usePagination'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Item from './Item'

const Pagination = ({ totalCount }: { totalCount: number }) => {
  const [searchParams] = useSearchParams()
  const pagination = usePagination(totalCount, +searchParams.get('page')! || 1)

  const range = () => {
    const currentPage = +searchParams.get('page')!
    const pageSize = +import.meta.env.VITE_LIMIT || 10
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount)
    const end = Math.min(currentPage * pageSize, totalCount)

    return `${start} - ${end}`
  }
  return (
    <div className='flex items-center justify-between w-full italic'>
      {!+searchParams.get('page')! ? (
        <span>{`Hiển thị kết quả ${Math.min(1, totalCount)} - ${Math.min(
          +import.meta.env.VITE_LIMIT,
          totalCount
        )} của ${totalCount} bài`}</span>
      ) : (
        ''
      )}
      {+searchParams.get('page')! ? <span>{`Hiển thị kết quả ${range()} của ${totalCount} bài`}</span> : ''}
      <div className='flex items-center gap-2'>{pagination?.map((el, index) => <Item key={index}>{el}</Item>)}</div>
    </div>
  )
}

export default Pagination
