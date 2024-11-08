import { memo } from 'react'
import { HashLoader } from 'react-spinners'

type LoadingColor = 'white' | 'main-500'

const loadingColor: Record<LoadingColor, string> = {
  white: '#fff',
  'main-500': '#28666e'
}
interface Props {
  size?: number
  color?: LoadingColor
}
function Loading({ size = 100, color = 'main-500' }: Props) {
  return <HashLoader color={loadingColor[color]} size={size} speedMultiplier={1} />
}
export default memo(Loading)
