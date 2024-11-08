import { memo } from 'react'
import { BounceLoader } from 'react-spinners'

const PageLoading = () => {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center glass-white z-[1000]'>
      <BounceLoader color='#36d7b7' size={100} />
    </div>
  )
}

export default memo(PageLoading)
