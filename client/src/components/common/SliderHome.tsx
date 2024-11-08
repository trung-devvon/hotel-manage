import React, { memo } from 'react'
import Title from './Title'
import Slider, { Settings, CustomArrowProps } from 'react-slick'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import clsx from 'clsx'

interface IProps {
  subTitle?: string
  title?: string
  count?: number
  children: React.ReactNode
}

function NextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props
  return (
    <div
      className={clsx(
        className,
        '!flex !bg-teal-500 !text-white !w-[25px] !h-[25px] items-center justify-center rounded-full shadow-lg'
      )}
      style={{ ...style }}
      onClick={onClick}
    >
      <FiChevronLeft size={20} />
    </div>
  )
}

function PrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props
  return (
    <div
      className={clsx(
        className,
        '!flex !bg-teal-500 !text-white !w-[25px] !h-[25px] items-center justify-center rounded-full shadow-lg'
      )}
      style={{ ...style }}
      onClick={onClick}
    >
      <FiChevronRight size={20} />
    </div>
  )
}

const SliderHome = ({ subTitle, title, count = 4, children }: IProps) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: count,
    lazyLoad: 'progressive',
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  }

  return (
    <div className='w-full flex flex-col my-4'>
      <Title px={false} line={false}>
        {title}
      </Title>
      {subTitle && <small className='text-gray-500 text-lg font-normal -mt-3 mb-5'>&nbsp;{subTitle}</small>}

      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

export default memo(SliderHome)
