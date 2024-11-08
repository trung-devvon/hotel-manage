import { Button } from '@material-tailwind/react'
import clsx from 'clsx'
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
}
const Item = ({ children }: IProps) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const handlePagination = () => {
    const params: any = Object.fromEntries([...searchParams])
    if (!Number(children)) return
    params.page = children
    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString()
    })
  }
  return (
    <Button
      className={clsx('')}
      variant={!Number(children) ? 'text' : 'gradient'}
      type='button'
      onClick={handlePagination}
      disabled={!Number(children)}
      size='sm'
      color={
        +children! === +searchParams.get('page')! || (+children! === 1 && !searchParams.has('page')) ? 'amber' : 'blue'
      }
    >
      {children}
    </Button>
  )
}

export default Item
