import React, { memo, useEffect, useState } from 'react'
import Title from './Title'
import Carousel from 'nuka-carousel'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface IProps {
  subTitle?: string
  title?: string
  count?: number
  children: React.ReactNode
}
const Slider = ({ subTitle, title, count = 4, children }: IProps) => {
  const [slideToShow, setSlideToShow] = useState(count)

  useEffect(() => {
    const handleResize = () => {
      const tabletMediaQuery = window.matchMedia('(max-width: 1024px)')
      const mobileMediaQuery = window.matchMedia('(max-width: 767px)')
      if (tabletMediaQuery.matches) {
        setSlideToShow(2)
      } else if (mobileMediaQuery.matches) {
        setSlideToShow(1)
      } else {
        setSlideToShow(count)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [count])
  return (
    <div className='w-full flex flex-col my-4'>
      <Title px={false} line={false}>
        {title}
      </Title>
      {subTitle && <small className='text-gray-500 text-lg font-normal -mt-3 mb-5'>&nbsp;{subTitle}</small>}
      <Carousel
        className='w-full'
        slidesToShow={slideToShow}
        autoplay={true}
        autoplayInterval={4000}
        slidesToScroll={1}
        cellSpacing={16}
        renderBottomCenterControls={null}
        wrapAround={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <button
            className='p-2 bg-white border shadow-sm rounded-full -translate-x-3 -translate-y-5'
            onClick={previousSlide}
          >
            <FiChevronLeft color='#28666e' size={20} />
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button
            className='p-2 bg-white border shadow-sm rounded-full translate-x-3 -translate-y-5'
            onClick={nextSlide}
          >
            <FiChevronRight color='#28666e' size={20} />
          </button>
        )}
      >
        {children}
      </Carousel>
    </div>
  )
}

export default memo(Slider)
