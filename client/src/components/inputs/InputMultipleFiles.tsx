import { apiUploadImageCloudinary } from '@api/app'
import { ValidText } from '@components/common'
import Loading from '@components/common/Loading'
import clsx from 'clsx'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

interface Props {
  style?: string
  label: string
  id: string
  name: string
  getFile: Dispatch<SetStateAction<string[]>>
  invalid: boolean
  preview: string[]
}
const InputMultipleFiles = ({ style, label, id, name, getFile, invalid, preview }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hoverElement, setHoverElement] = useState('')
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const imagePaths = []
      setIsLoading(true)
      const formData = new FormData()
      for (const file of e.target.files) {
        formData.append('file', file)
        formData.append('upload_preset', 'bookingtour')
        const response = await apiUploadImageCloudinary(formData)
        if (response.status === 200) {
          imagePaths.push(response.data?.secure_url)
        }
      }
      setIsLoading(false)
      getFile(imagePaths)
    }
  }
  const handleRemoveImage = (e: React.MouseEvent, imagePath: string) => {
    e.preventDefault()
    const removeImage = preview.filter((img) => img !== imagePath)
    getFile(removeImage)
  }
  return (
    <div className={clsx('flex flex-col w-full gap-2 min-h-[170px]', style)}>
      <span className='text-teal-500 tracking-tight text-md capitalize ml-[2px]'>{label + ':'}</span>
      <label
        className='min-h-[300px] border-4 border-dashed border-teal-500 flex justify-center items-center rounded-lg cursor-pointer flex-col gap-2 p-1'
        htmlFor={id}
      >
        {isLoading ? (
          <Loading />
        ) : preview.length > 0 ? (
          <div className='grid grid-cols-5 w-full h-full gap-3'>
            {preview.map((img) => (
              <div
                key={img}
                onMouseEnter={() => setHoverElement(img)}
                onMouseLeave={() => setHoverElement('')}
                className='h-[282px] col-span-1 relative'
              >
                {hoverElement === img && (
                  <div
                    onClick={(e) => handleRemoveImage(e, img)!}
                    className='absolute inset-0 bg-blend-overlay flex items-center justify-center bg-second-50 p-4'
                  >
                    <BsTrash3 size={24} color={'white'} />
                  </div>
                )}
                <img className=' h-full w-full border p-1 object-contain border-teal-500 rounded-sm' src={img} alt='' />
              </div>
            ))}
          </div>
        ) : (
          <>
            <span className='text-main-500'>
              <MdOutlineAddPhotoAlternate size={50} />
            </span>
            <span className='text-main-500 tracking-tight'>Tải lên ảnh .png .jpg .jpeg .webp</span>
          </>
        )}
      </label>
      {invalid && (
        <div>
          <ValidText>Vui lòng chọn hình ảnh. (có thể chọn nhiều ảnh)</ValidText>
        </div>
      )}
      <input
        accept='image/png, image/jpg, image/jpeg, image/webp'
        onChange={handleUploadFile}
        type='file'
        multiple
        hidden
        id={id}
        name={name}
      />
    </div>
  )
}

export default InputMultipleFiles
