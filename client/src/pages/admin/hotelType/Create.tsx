import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PageLoading, Title, ValidText } from '@components/common'
import { Input } from '@material-tailwind/react'
import { hotelTypeSchema, HotelTypeSchema } from '@utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputFile } from '@components/inputs'
import { generateCode } from '@utils/fn'
import { toggleLoading } from '@redux/slices/app.slice'
import { apiCreateNewHotelType } from '@api/hotel'
import toast from 'react-hot-toast'

const Create = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit: validateForm,
    reset
  } = useForm<HotelTypeSchema>({
    resolver: yupResolver(hotelTypeSchema)
  })
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.app)
  const [image, setImage] = useState<string | null>(null)
  const [invalid, setInvalid] = useState(false)
  useEffect(() => {
    if (!image && isDirty) return setInvalid(true)
    else setInvalid(false)
  }, [image, isDirty])
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!invalid) {
      const payload = { ...data, image, code: generateCode(data.name) }
      dispatch(toggleLoading(true))
      const response: any = await apiCreateNewHotelType(payload)
      dispatch(toggleLoading(false))
      if (response?.success) {
        toast.success(response.message)
        reset()
        setImage(null)
      } else toast.error(response.message)
    }
  }
  return (
    <>
      {isLoading && <PageLoading />}
      <div className='flex flex-col'>
        <Title>Tạo loại chỗ nghỉ</Title>
        <form onSubmit={validateForm(handleSubmit)} className='py-8 flex flex-col gap-4 w-[600px] mx-auto'>
          <div className='w-full'>
            <Input color='teal' crossOrigin={'true'} label='Nhập loại chỗ nghỉ' {...register('name')} />
            <ValidText>{errors.name?.message}</ValidText>
          </div>
          <div className='w-full'>
            <InputFile
              preview={image}
              getFile={setImage}
              style='my-5'
              id='hotelTypeImage'
              name='hotelTypeImage'
              label='Chọn ảnh hiển thị loại chỗ nghỉ'
              invalid={invalid}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default Create
