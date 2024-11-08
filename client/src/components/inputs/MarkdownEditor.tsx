import React, { memo } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface Props {
  changeValue: any
  name: string
  title?: string
  height: number
  invalidFields?: any
  setInvalidFields?: any
  value: any // state
  isDelete?: boolean
}

const MarkdownEditor = ({
  changeValue,
  name,
  title,
  height,
  invalidFields,
  setInvalidFields,
  value,
  isDelete
}: Props) => {
  return (
    <div className='flex gap-4 flex-col'>
      <span className='font-semibold flex gap-4 items-center'>
        <span className='text-md capitalize ml-[2px] text-main-600 tracking-tight'>{title}</span>
        {isDelete && (
          <span
            onClick={() => changeValue((prev: any) => ({ ...prev, [name]: '' }))}
            className='text-orange-500 hover:underline cursor-pointer text-xs'
          >
            Clear
          </span>
        )}
      </span>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_KEY}
        initialValue={value}
        init={{
          height,
          width: '100%',
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={(e) => changeValue((prev: any) => ({ ...prev, [name]: e.target.getContent() }))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el: any) => el.name === name) && (
        <small className='validate'>{invalidFields?.find((el: any) => el.name === name)?.message}</small>
      )}
    </div>
  )
}

export default memo(MarkdownEditor)
