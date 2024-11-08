import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { Button } from '@material-tailwind/react'
import { useAppDispatch, useAppSelector } from '@hooks/useApp'
import { toggleSearchService } from '@redux/slices/app.slice'
import { useSearchParams } from 'react-router-dom'

const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const MONTHS = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12'
]

interface DateRange {
  startDate: string | null
  endDate: string | null
}

interface DatePickerProps {
  setValue: any
  dateRange: any
}

const DatePicker: React.FC<DatePickerProps> = ({ setValue, dateRange }) => {
  const dispatch = useAppDispatch()
  const { calendar } = useAppSelector((state) => state.app.searchServices)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')
  const today = new Date() // Lấy ngày hôm nay

  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (dateRange.startDate) {
      setCurrentMonth(new Date(dateRange.startDate))
    }
  }, [dateRange.startDate])

  const generateDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push(date)
    }

    return days
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default button behavior
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default button behavior
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    // Kiểm tra nếu ngày đã qua thì không cho phép chọn
    if (date < today) return

    const formattedDate = formatDateForValue(date)
    if (selecting === 'start' || !dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      setValue({ startDate: formattedDate, endDate: null })
      setSelecting('end')
    } else {
      if (new Date(formattedDate) >= new Date(dateRange.startDate!)) {
        setValue({ ...dateRange, endDate: formattedDate })
        setSelecting('start')
      } else {
        setValue({ startDate: formattedDate, endDate: dateRange.startDate })
        setSelecting('start')
      }
    }
  }

  const formatDateForDisplay = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`
  }

  const formatDateForValue = (date: Date): string => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className='w-full bg-white shadow-lg rounded-lg relative'>
      <div className='p-4'>
        <div
          className='flex items-center justify-between'
          onClick={() => dispatch(toggleSearchService({ calendar: !calendar }))}
        >
          <input
            type='text'
            value={`${
              dateRange.startDate
                ? formatDateForDisplay(dateRange.startDate)
                : searchParams.has('startDate')
                  ? formatDateForDisplay(searchParams.get('startDate'))
                  : 'Ngày nhận phòng'
            } - ${
              dateRange.endDate
                ? formatDateForDisplay(dateRange.endDate)
                : searchParams.has('endDate')
                  ? formatDateForDisplay(searchParams.get('endDate'))
                  : 'Ngày trả phòng'
            }`}
            placeholder='Chọn ngày'
            className='w-full p-2 border rounded cursor-pointer text-gray-500'
            readOnly
          />
          <FaRegCalendarAlt className='ml-2' />
        </div>
      </div>
      {calendar && (
        <div className='p-4 absolute top-full z-[100] bg-white rounded-md mt-1 shadow-lg'>
          <div className='flex justify-between items-center mb-4'>
            <button onClick={handlePrevMonth} className='p-1 text-main-500'>
              <FaChevronLeft size={20} />
            </button>
            <span>
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button onClick={handleNextMonth} className='p-1 text-main-500'>
              <FaChevronRight size={20} />
            </button>
          </div>
          <div className='grid grid-cols-7 gap-1'>
            {DAYS.map((day) => (
              <div key={day} className='text-center font-bold'>
                {day}
              </div>
            ))}
            {generateDays().map((day, index) => (
              <div
                key={index}
                className={`text-center p-2 cursor-pointer ${
                  day && day.getTime() < today.setHours(0, 0, 0, 0) // Kiểm tra ngày so với ngày hôm nay
                    ? 'text-gray-300 cursor-not-allowed'
                    : day && dateRange.startDate && formatDateForValue(day) === dateRange.startDate
                      ? 'bg-main-500 text-white rounded-md'
                      : day && dateRange.endDate && formatDateForValue(day) === dateRange.endDate
                        ? 'bg-main-500 text-white rounded-md'
                        : day &&
                            dateRange.startDate &&
                            dateRange.endDate &&
                            formatDateForValue(day) > dateRange.startDate &&
                            formatDateForValue(day) < dateRange.endDate
                          ? 'bg-blue-100'
                          : day
                            ? 'hover:bg-gray-100 rounded-md'
                            : ''
                }`}
                onClick={() => day && day.getTime() >= today.setHours(0, 0, 0, 0) && handleDateClick(day)} // Cho phép chọn ngày hôm nay trở đi
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
          <div className='flex my-2 items-center justify-end'>
            <Button
              onClick={() => dispatch(toggleSearchService({ calendar: !calendar }))}
              disabled={!dateRange.endDate || !dateRange.startDate}
              size='sm'
            >
              Xác Nhận
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
