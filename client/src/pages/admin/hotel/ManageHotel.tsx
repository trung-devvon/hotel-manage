import { apiGetHotels } from '@api/hotel'
import { ModelDialog, Title } from '@components/common'
import { useDebounce } from '@hooks/useDebounce'
import { Button, Input, Tooltip } from '@material-tailwind/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { TfiTrash } from 'react-icons/tfi'
import { TfiPencil } from 'react-icons/tfi'
import { Pagination } from '@components/Pagination'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { modal } from '@redux/slices/app.slice'
import { AddGeneralRule } from '../GeneralRule'

const ManageHotel = () => {
  const {
    register,
    formState: { errors },
    handleSubmit: validateForm,
    reset,
    watch
  } = useForm()
  const [hotels, setHotels] = useState<any>(null)
  const [editHotel, setEditHotel] = useState(null)
  const [update, setUpdate] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [id, setId] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const debounceValue = useDebounce(watch('keyword'))
  const fetchHotels = async (params: any) => {
    const response: any = await apiGetHotels({ ...params, limit: +import.meta.env.VITE_LIMIT })
    if (response.success) setHotels(response.hotels)
  }
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    if (debounceValue) params.keyword = debounceValue
    else delete params.keyword
    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString()
    })
  }, [debounceValue])
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    if (!editHotel) fetchHotels({ ...params })
  }, [searchParams])
  const confirmDelete = () => {
    setOpenModal(false)
  }
  const handleDelete = (id: string) => {
    setOpenModal(true)
    setId(id)
  }
  return (
    <div className='w-full'>
      <ModelDialog
        open={openModal}
        setOpen={setOpenModal}
        title='Xác nhận thao tác'
        body='Bạn có chắc muốn xóa bài đăng này?'
        onConfirm={confirmDelete}
      />
      <Title>Quản lý khách sạn/chỗ ở</Title>
      <div className='w-full p-4'>
        <div className='w-2/5'>
          <Input id='keyword' color='teal' crossOrigin={'true'} label='Tìm kiếm...' {...register('keyword')} />
        </div>
        <div className='p-2 border my-2 rounded-md'>
          <table className='table-auto w-full'>
            <thead>
              <tr className='text-main-500 bg-gray-50'>
                <th className='p-3 text-center'>STT</th>
                <th className='p-3 text-center'>Tên</th>
                <th className='p-3 text-center'>Thể loại</th>
                <th className='p-3 text-center'>Đánh giá</th>
                <th className='p-3 text-center'>Địa chỉ</th>
                <th className='p-3 text-center'>Địa điểm tham quan</th>
                <th className='p-3 text-center'>Trạng thái</th>
                <th className='p-3 text-center'>Ngày tạo</th>
                <th className='p-3 text-center'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {hotels?.rows.map((el: any, index: number) => (
                <tr key={el.id} className='border'>
                  { /* test: 4 * 1 + 1 + index) */}
                  <td className='text-center p-3'>
                    {+import.meta.env.VITE_LIMIT *
                      (+searchParams.get('page')! - 1 > 0 ? +searchParams.get('page')! - 1 : 0) +
                      1 +
                      index}
                  </td>
                  <td className='text-center p-3'>{el.name}</td>
                  <td className='text-center p-3'>{el.typeCode ? el.typeCode : 'chưa có'}</td>
                  <td className='text-center p-3'>{el.star ? el.star : 'chưa có'}</td>
                  <td className='text-center p-3'>{el.address}</td>
                  <td className='text-center p-3'>{el.destinationData?.name}</td>
                  <td className='text-center p-3'>{el.status == 'ROOMS' ? 'còn phòng' : 'hết phòng'}</td>
                  <td className='text-center p-3'>{moment(el.createdAt).format('DD/MM/YY')}</td>
                  <td className='text-center p-3'>
                    <div className='flex gap-2'>
                      <Tooltip
                        content='sửa'
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 }
                        }}
                      >
                        <Button color='teal' size='sm'>
                          <TfiPencil />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        content='xoá'
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 }
                        }}
                      >
                        <Button onClick={() => handleDelete(el.id)} color='amber' size='sm'>
                          <TfiTrash />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        content='quy định'
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 }
                        }}
                      >
                        <Button
                          onClick={() =>
                            dispatch(modal({ isShowModal: true, modalContent: <AddGeneralRule data={el} /> }))
                          }
                          color='teal'
                          size='sm'
                        >
                          <IoIosAddCircleOutline size={15} />
                        </Button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {hotels && (
            <div className='flex my-4'>
              <Pagination totalCount={hotels?.count} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageHotel
