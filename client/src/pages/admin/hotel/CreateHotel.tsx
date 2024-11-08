import { apiCreateNewHotel } from '@api/hotel'
import { PageLoading, Title, ValidText } from '@components/common'
import { Facilities } from '@components/facilities'
import { InputMultipleFiles, MarkdownEditor } from '@components/inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import { modal, toggleLoading } from '@redux/slices/app.slice'
import { setDefaultFacilities } from '@redux/slices/hotel.slice'
import { HotelSchema, hotelSchema } from '@utils/schemas'
import React, { useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { AddGeneralRule } from '../GeneralRule'

interface IValidateForm {
  destinations: string | null
  facilities: string | null
  images: boolean
  hotelType: string | null
  star: number | null
}
const hotelStars = [
  { star: '1', text: 'Tiêu chuẩn 1 sao'},
  { star: '2', text: 'Tiêu chuẩn 2 sao'},
  { star: '3', text: 'Tiêu chuẩn 3 sao'},
  { star: '4', text: 'Tiêu chuẩn 4 sao'},
  { star: '5', text: 'Tiêu chuẩn 5 sao'},
]
const CreateHotel = () => {
  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit
  } = useForm<HotelSchema>({
    resolver: yupResolver(hotelSchema)
  })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [images, setImage] = useState<string[]>([])
  const [des, setDes] = useState<any>('')
  const [hotelTypesChoose, setHotelTypes] = useState('')
  const [hotelStar, setHotelStar] = useState<any>('0')
  const [invalid, setInvalid] = useState<IValidateForm>({
    destinations: null,
    facilities: null,
    images: false,
    hotelType: null,
    star: null
  })
  const [dataDescription, setDataDescription] = useState<any>({
    description: ''
  })
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!images.length && isDirty) return setInvalid((prev) => ({ ...prev, images: true }))
    else setInvalid((prev) => ({ ...prev, images: false }))
  }, [images, isDirty])
  const { destinations, isLoading, hotelTypes } = useAppSelector((state) => state.app)
  const { facilities } = useAppSelector((state) => state.hotel)

  const handleChangeDestinations = (value: any) => {
    setDes(value)
    setInvalid((prev) => ({ ...prev, destinations: null }))
  }
  const handleChangeHotelTypes = (value: any) => {
    setHotelTypes(value)
    setInvalid((prev) => ({ ...prev, hotelType: null }))
  }
  const handleChangeHotelStar = (value: any) => {
    setHotelStar(value)
    setInvalid((prev) => ({ ...prev, star: null }))
  }
  useEffect(() => {
    if (facilities.length === 0 || !facilities) {
      setInvalid((prev) => ({ ...prev, facilities: 'Vui lòng chọn đầy đủ các tiện nghi mà khách sạn có' }))
    } else {
      setInvalid((prev) => ({ ...prev, facilities: null }))
    }
  }, [facilities])
  useEffect(() => {
    if (!hotelTypesChoose) {
      setInvalid((prev) => ({ ...prev, hotelType: 'Vui lòng chọn loại chỗ nghỉ' }))
    } else {
      setInvalid((prev) => ({ ...prev, hotelType: null }))
    }
  }, [hotelTypesChoose])

  const whenSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!des) {
      setInvalid((prev) => ({ ...prev, destinations: 'Vui lòng chọn địa điểm tham quan [!]' }))
      return
    }
    if (invalid.images !== false || invalid.facilities || invalid.destinations || invalid.hotelType || invalid.star) {
      return toast('Nhập dữ liệu chưa đầy đủ')
    }

    const payload: any = {
      ...data,
      name: data.name,
      star: +hotelStar,
      address: data.address,
      destinationCode: des,
      images,
      facilities,
      typeCode: hotelTypesChoose,
      lnglat: ['37.7749', '-122.4194']
    }
    if (dataDescription) payload.description = dataDescription.description
    dispatch(toggleLoading(true))
    console.log(payload)
    const response: any = await apiCreateNewHotel(payload)
    dispatch(toggleLoading(false))
    if (response.success) {
      toast.success(response.message)
      reset()
      setImage([])
      setDes('')
      setHotelTypes('')
      dispatch(setDefaultFacilities())
      setDataDescription({
        description: ''
      })
      Swal.fire({
        title: 'Thành công!',
        text: 'Tạo bài đăng thành công. Giờ hãy thiết lập các quy địn chung cho khách sạn này nào!',
        showCancelButton: true,
        cancelButtonText: 'Để sau',
        confirmButtonText: 'Đi tới thiết lập',
        icon: 'success'
      }).then((feedback: any) => {
        if (feedback.isConfirmed) {
          dispatch(modal({ isShowModal: true, modalContent: <AddGeneralRule data={response.hotel} /> }))
        }
      })
      scrollRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    } else toast.error(response.message)
  }
  return (
    <>
      {isLoading && <PageLoading />}
      <div ref={scrollRef}>
        <Title>Tạo mới bài đăng về khách sạn / chỗ ở</Title>
        <form onSubmit={handleSubmit(whenSubmit)} className='p-5 flex flex-col'>
          <div className='grid grid-cols-10 gap-6'>
            <div className='col-span-4 w-full'>
              <div className='w-full'>
                <Input color='teal' crossOrigin={'true'} label='Nhập tiêu đề bài đăng' {...register('name')} />
                <ValidText>{errors.name?.message}</ValidText>
              </div>
            </div>
            <div className='col-span-3 w-full'>
              <Select color='teal' label='Chọn địa điểm tham quan' value={des} onChange={handleChangeDestinations}>
                {destinations?.map((data) => (
                  <Option key={data.code} value={data.code}>
                    {data.name}
                  </Option>
                ))}
              </Select>
              <ValidText>{invalid.destinations}</ValidText>
            </div>
            <div className='col-span-3 w-full'>
              <Select color='teal' label='Tiêu chuẩn khách sạn' value={hotelStar} onChange={handleChangeHotelStar}>
                {hotelStars?.map((data) => (
                  <Option key={data.star} value={data.star}>
                    {data.text}
                  </Option>
                ))}
              </Select>
              <ValidText>{invalid.star}</ValidText>
            </div>
          </div>
          <div className='w-full my-3'>
            <InputMultipleFiles
              getFile={setImage}
              id='hotelImages'
              name='hotelImages'
              label='Chọn ảnh chi tiết khách sạn, chỗ ở'
              invalid={invalid.images}
              preview={images}
            />
          </div>
          <Facilities id='facilities' label='Chọn các loại tiện nghi' />
          <span className='mb-10'>
            <ValidText>{invalid.facilities}</ValidText>
          </span>
          <div className='grid grid-cols-10 gap-6'>
            <div className='col-span-3'>
              <div className='w-full'>
                <Select
                  label='Chọn loại chỗ nghỉ'
                  color='teal'
                  value={hotelTypesChoose}
                  onChange={handleChangeHotelTypes}
                >
                  {hotelTypes.map((type) => (
                    <Option className='capitalize' key={type.id} value={type.code}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className='col-span-7'>
              <div className='w-full'>
                <Input color='teal' crossOrigin={'true'} label='Nhập Địa Chỉ' {...register('address')} />
                <ValidText>{errors.address?.message}</ValidText>
              </div>
            </div>
          </div>
          <MarkdownEditor
            height={400}
            value={dataDescription.description}
            title='Mô tả về chỗ nghỉ:'
            changeValue={setDataDescription}
            name='description'
          />
          <Button color='teal' type='submit'>
            Tạo mới khách sạn
          </Button>
        </form>
      </div>
    </>
  )
}

export default CreateHotel
