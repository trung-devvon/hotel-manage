import { Logo } from '@components/common'
import { Button, Input, Typography } from '@material-tailwind/react'
import { pathUser } from '@utils/path'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Schema, schema } from '@utils/schemas'
import { IoEyeOffOutline } from 'react-icons/io5'
import { IoEyeOutline } from 'react-icons/io5'
import clsx from 'clsx'
import { apiLogin, apiRegister } from '@api/user'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { login } from '@redux/slices/user.slice'
import toast from 'react-hot-toast'

const loginSchema = schema.pick(['email', 'password'])

export default function Auth() {
  const [variant, setVariant] = useState('LOGIN')
  const [hide, setHide] = useState({ password: true, confirmPassword: true })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { current } = useAppSelector((state) => state.user)
  const pickSchema: any = variant != 'LOGIN' ? schema : loginSchema
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<Schema>({
    resolver: yupResolver(pickSchema)
  })
  const handleAuth: SubmitHandler<FieldValues> = async (data) => {
    if (variant === 'LOGIN') {
      const response: any = await apiLogin({
        email: data.email,
        password: data.password
      })
      if (response?.success) {
        dispatch(login({ token: response.accessToken }))
        navigate('/', { state: { token: response.accessToken } })
        toast.success(response.message)
      } else toast.error(response.message)
    }
    if (variant != 'LOGIN') {
      const response: any = await apiRegister({
        name: data.name,
        email: data.email,
        password: data.password
      })
      if (response?.success) {
        dispatch(login({ token: response.accessToken }))
        toggleVariant()
        toast.success(response.message)
      } else toast.error(response.message)
    }
  }
  const toggleVariant = () => {
    variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
  }
  const handlePasswordToggle = (field: 'password' | 'confirmPassword') => {
    setHide((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }
  useEffect(() => {
    if (location?.state) setVariant(location.state)
  }, [location])
  useEffect(() => {
    reset()
  }, [variant])
  if (current) return <Navigate to={'/'} replace={true} />
  return (
    <div className='w-full h-full'>
      <Link to={pathUser.PUBLIC} className='w-full h-[68px] bg-light shadow-2 flex items-center justify-center'>
        <Logo />
      </Link>
      <div className='py-8 px-3 max-w-[480px] mx-auto border rounded-md bg-white'>
        <h3 className='text-2xl text-center text-stone-600 capitalize mb-6'>
          {variant === 'LOGIN' ? 'Đăng Nhập tài khoản' : 'Đăng Ký tài khoản'}
        </h3>
        <form onSubmit={handleSubmit(handleAuth)}>
          {variant != 'LOGIN' && (
            <div className='w-full'>
              <Input color='teal' label='Tên đầy đủ' crossOrigin={'true'} type='text' {...register('name')} />
              <Typography className='my-2 min-h-[20px] pl-1' color='red' variant='small'>
                {errors.name?.message || ''}
              </Typography>
            </div>
          )}
          <div className='w-full'>
            <Input color='teal' label='Email' crossOrigin={'true'} type='text' {...register('email')} />
            <Typography className='my-2 min-h-[20px] pl-1' color='red' variant='small'>
              {errors.email?.message || ''}
            </Typography>
          </div>
          <div className='w-full'>
            <Input
              color='teal'
              label='Mật Khẩu'
              id='password'
              crossOrigin={'true'}
              type={hide.password ? 'password' : 'text'}
              {...register('password')}
              icon={
                <span className='cursor-pointer' onClick={() => handlePasswordToggle('password')}>
                  {hide.password ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </span>
              }
            />
            <Typography className='my-2 min-h-[20px] pl-1' color='red' variant='small'>
              {errors.password?.message || ''}
            </Typography>
          </div>

          {variant != 'LOGIN' && (
            <div className='w-full'>
              <Input
                color='teal'
                label='Nhập Lại Mật Khẩu'
                id='confirmPassword'
                crossOrigin={'true'}
                type={hide.confirmPassword ? 'password' : 'text'}
                {...register('confirmPassword')}
                icon={
                  <span className='cursor-pointer' onClick={() => handlePasswordToggle('confirmPassword')}>
                    {hide.confirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                  </span>
                }
              />
              {errors?.confirmPassword && (
                <Typography className='my-2 min-h-[20px] pl-1' color='red' variant='small'>
                  {errors?.confirmPassword?.message || ''}
                </Typography>
              )}
            </div>
          )}

          <Button className={clsx('mx-auto block w-1/3', variant != 'LOGIN' && 'mt-7')} type='submit'>
            {variant === 'LOGIN' ? 'Đăng Nhập' : 'Đăng Ký'}
          </Button>
          {variant === 'LOGIN' && (
            <p className='justify-center text-md flex gap-2 mt-3'>
              <span>Bạn chưa có tải khoản?</span>
              <span className='text-main-500 hover:text-main-600 cursor-pointer' onClick={toggleVariant}>
                Đăng Ký
              </span>
            </p>
          )}
          {variant === 'REGISTER' && (
            <p className='justify-center text-md flex gap-2 mt-3'>
              <span>Bạn đã có tài khoản?</span>
              <span className='text-main-500 hover:text-main-600 cursor-pointer' onClick={toggleVariant}>
                Đăng Nhập
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
