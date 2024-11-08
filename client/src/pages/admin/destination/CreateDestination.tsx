import { apiCreateNewDestination } from '@api/destination'
import { Title } from '@components/common'
import { InputFile } from '@components/inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { Button, Input, Typography } from '@material-tailwind/react'
import { toggleLoading } from '@redux/slices/app.slice'
import { generateCode } from '@utils/fn'
import { DestinationSchema, destinationSchema } from '@utils/schemas'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const CreateDestination = () => {
  const { isLoading } = useAppSelector((state) => state.app)
  const [image, setImage] = useState<string | null>(null)
  const [invalid, setInvalid] = useState(false)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<DestinationSchema>({ resolver: yupResolver(destinationSchema) })
  useEffect(() => {
    if (!image && isDirty) return setInvalid(true)
    else setInvalid(false)
  }, [image, isDirty])
  console.log(errors.name?.message, ' test')
  const whenSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!invalid) {
      const payload = { ...data, image, code: generateCode(data.name) }
      dispatch(toggleLoading(true))
      const response: any = await apiCreateNewDestination(payload)
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
    <div>
      <Title>Tạo mới địa điểm tham quan</Title>
      <form onSubmit={handleSubmit(whenSubmit)} className='py-8 max-w-[600px] mx-auto'>
        <div className='w-full'>
          <Input color='teal' type='text' crossOrigin={'true'} label='Tên địa điểm' {...register('name')} />
          <Typography className='my-2 min-h-[20px] pl-1' color='red' variant='small'>
            {errors.name?.message || ''}
          </Typography>
        </div>
        <div className='w-full'>
          <InputFile
            preview={image}
            getFile={setImage}
            style='my-5'
            id='destinationImage'
            name='destinationImage'
            label='Chọn ảnh hiển thị bài đăng'
            invalid={invalid}
          />
        </div>
        <Button disabled={isLoading} loading={isLoading} className='w-full' color='teal' type='submit'>
          {isLoading ? 'Vui lòng chờ' : 'Thêm địa điểm'}
        </Button>
      </form>
    </div>
  )
}

export default CreateDestination
