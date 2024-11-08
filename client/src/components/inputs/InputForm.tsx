import { InputHTMLAttributes, memo, useState } from 'react'
import type { UseFormRegister, RegisterOptions, FieldValues, FieldPath, DeepMap, FieldError } from 'react-hook-form'
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs'
import clsx from 'clsx'
import { Input } from '@material-tailwind/react'

interface Props<TFieldValues extends FieldValues> {
  label: string
  name: FieldPath<TFieldValues>
  id: string
  type?: string
  fullWidth?: boolean
  styleParent?: string
  styleChildren?: string
  fieldErrors?: DeepMap<TFieldValues, FieldError>
  register?: UseFormRegister<TFieldValues>
  rules?: RegisterOptions
}

function InputForm<TFieldValues extends FieldValues>({
  label,
  id,
  name,
  type,
  fullWidth,
  styleParent,
  styleChildren,
  fieldErrors,
  register,
  rules
}: Props<TFieldValues>) {
  const registerResult = register && name ? register(name) : null
  const [hidePassword, setHidePassword] = useState(false)
  const handleType = (): string => {
    if (type === 'password') {
      return hidePassword ? 'text' : 'password'
    }
    return type as string
  }
  const toggleEye = () => {
    setHidePassword((prev) => !prev)
  }
  return (
    <div className={clsx('flex flex-col gap-1 mt-3', styleParent)}>
      <div className={clsx('relative', fullWidth && 'w-full')}>
        <Input
          label={label}
          type={handleType()}
          id={id}
          name={name}
          {...registerResult}
          className={clsx(
            'border border-main-500 text-main-600 py-2 px-3 w-full',
            fieldErrors && 'border-red-500',
            styleChildren
          )}
          crossOrigin={'true'}
          icon={
            type === 'password' && (
              <p onClick={toggleEye}>{hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</p>
            )
          }
        />
      </div>
      {fieldErrors && <small className='text-sm text-red-600 ml-1 capitalize'>{fieldErrors?.message}</small>}
    </div>
  )
}
export default memo(InputForm)
