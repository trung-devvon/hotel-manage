import clsx from 'clsx'
import { FC } from 'react'
import { TbBrandBooking } from 'react-icons/tb'

interface LogoProps {
  w?: string
  bdColor?: string
  bg?: string
}
const Logo: FC<LogoProps> = ({ w, bdColor, bg }) => {
  return (
    <span
      className={clsx(
        'font-bold uppercase flex justify-center items-center border-l border-b rounded-full px-4 py-2 cursor-pointer',
        w && `w-[${w}]`,
        bdColor,
        bg
      )}
    >
      <span>VN</span> <TbBrandBooking size={24} />
      <span>ooking</span>
    </span>
  )
}

export default Logo
