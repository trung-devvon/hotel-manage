import { generateRange } from '@utils/fn'
import { useMemo } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const usePagination = (totalItemsCount: number, currentPage: number, limit?: number, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = +limit! || +import.meta.env.VITE_LIMIT || 10
    const paginationCount = Math.ceil(totalItemsCount / pageSize)
    const totalPaginationItem = siblingCount + 5 // Total pagination items to show

    // nếu số trang tính ra mà nhỏ hơn 6 thì show 1 -> số trang
    if (paginationCount <= totalPaginationItem) return generateRange(1, paginationCount)
    // Nếu trước trang hiện tại có lớn hơn 3 items thì hiện 3 chấm bên trái
    const isShowLeft = currentPage - siblingCount > 2
    // Nếu sau trang hiện tại có lớn hơn 3 items thì hiện 3 chấm bên phải
    const isShowRight = currentPage + siblingCount < paginationCount - 1

    // Dấu 3 chấm bên trái, bên phải không -> hiện 5 số cuối
    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4
      const rightRange = generateRange(rightStart, paginationCount)
      // eslint-disable-next-line react/jsx-key
      return [1, <BiDotsHorizontalRounded />, ...rightRange]
    }
    // Dấu 3 chấm bên phải, bên trái không -> hiện 5 số đầu
    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5)
      // eslint-disable-next-line react/jsx-key
      return [...leftRange, <BiDotsHorizontalRounded />, paginationCount]
    }
    // Check sib khi ở trang đầu cuối
    const siblingLeft = Math.max(currentPage - siblingCount, 1)
    const singlingRight = Math.min(currentPage + siblingCount, paginationCount)
    // Hiện cả trái phải -> hiện thị sib
    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, singlingRight)
      // eslint-disable-next-line react/jsx-key
      return [1, <BiDotsHorizontalRounded />, ...middleRange, <BiDotsHorizontalRounded />, paginationCount]
    }
  }, [totalItemsCount, currentPage, siblingCount])

  return paginationArray
}
export default usePagination
