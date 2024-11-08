import { apiCreateNewHotelType } from '@api/hotel'
import { Title, ValidText } from '@components/common'
import { InputFile } from '@components/inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { Button, Input } from '@material-tailwind/react'
import { toggleLoading } from '@redux/slices/app.slice'
import { generateCode } from '@utils/fn'
import { hotelTypeSchema, HotelTypeSchema } from '@utils/schemas'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const CreateHotelType = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit: validateForm,
    reset
  } = useForm<HotelTypeSchema>({
    resolver: yupResolver(hotelTypeSchema)
  })
  const { isLoading } = useAppSelector((state) => state.app)
  const [image, setImage] = useState<string | null>(null)
  const [invalid, setInvalid] = useState(false)
  useEffect(() => {
    if (isDirty && !image) {
      return setInvalid(true)
    } else setInvalid(false)
  }, [isDirty, image])
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!invalid) {
      const payload = { ...data, image, code: generateCode(data.name) }
      const response: any = await apiCreateNewHotelType(payload)
      dispatch(toggleLoading(false))
      if (response?.success) {
        toast.success(response.message)
        reset()
        setImage(null)
      } else {
        toast.error(response.message)
      }
    }
  }
  return (
    <div className='flex flex-col'>
      <Title>Tạo loại chỗ nghỉ</Title>
      <form onSubmit={validateForm(handleSubmit)} className='flex flex-col py-8 mx-auto w-[600px]'>
        <div className='w-full'>
          <Input color='teal' crossOrigin={'true'} label='Nhập tên loại chỗ nghỉ' {...register('name')} />
          <ValidText>{errors.name?.message}</ValidText>
        </div>
        <div className='w-full'>
          <InputFile
            preview={image}
            getFile={setImage}
            style='my-5'
            id='placeImage'
            name='placeImage'
            label='Chọn ảnh hiển thị chỗ nghỉ'
            invalid={invalid}
          />
        </div>
        <Button disabled={isLoading} loading={isLoading} className='w-full' color='teal' type='submit'>
          {isLoading ? 'Vui lòng chờ' : 'Thêm chỗ nghỉ'}
        </Button>
      </form>
    </div>
  )
}

export default CreateHotelType
