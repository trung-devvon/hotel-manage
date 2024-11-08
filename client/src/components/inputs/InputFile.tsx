import { apiUploadImageCloudinary } from '@api/app'
import Loading from '@components/common/Loading'
import clsx from 'clsx'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

interface Props {
  style?: string
  label: string
  id: string
  name: string
  getFile: Dispatch<SetStateAction<null | string>>
  invalid: boolean
  preview: null | string
}
const InputFile = ({ style, label, id, name, getFile, invalid, preview }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('upload_preset', 'bookingtour')
      setIsLoading(true)
      const response = await apiUploadImageCloudinary(formData)
      if (response.status === 200) {
        setIsLoading(false)
        getFile(response.data?.secure_url)
      }
    }
  }
  return (
    <div className={clsx('flex flex-col w-full min-h-[170px] gap-2', style)}>
      <span className='text-main-600 tracking-tight text-md capitalize ml-[2px]'>{label + ':'}</span>
      <label
        className='min-h-[300px] border-4 border-dashed border-main-500 flex justify-center items-center rounded-lg cursor-pointer flex-col gap-2'
        htmlFor={id}
      >
        {isLoading ? (
          <Loading />
        ) : preview ? (
          <img className='h-full object-contain' src={preview} alt='' />
        ) : (
          <>
            <span className='text-main-500'>
              <MdOutlineAddPhotoAlternate size={50} />
            </span>
            <span className='text-main-500 tracking-tight'>Tải lên ảnh .png .jpg .jpeg .webp</span>
          </>
        )}
      </label>
      {invalid && <small className='text-sm text-main-200'>Vui lòng chọn hình ảnh</small>}
      <input
        accept='image/png, image/jpg, image/jpeg, image/webp'
        onChange={handleUploadFile}
        type='file'
        hidden
        id={id}
        name={name}
      />
    </div>
  )
}

export default InputFile
