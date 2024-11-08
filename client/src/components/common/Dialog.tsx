import React from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

interface Props {
  title?: string
  body?: string | null
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cancelText?: string
  OkText?: string
  onlyConf?: boolean
  onConfirm?: () => void
}

const ModelDialog: React.FC<Props> = ({ title, body, open, setOpen, onlyConf, cancelText, OkText, onConfirm }) => {
  // const [open, setOpen] = useState(true)
  const handleOpen = () => setOpen(!open)
  const handleConfirm = () => {
    handleOpen()
    if (onConfirm) {
      onConfirm()
    }
  }
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 }
      }}
    >
      <DialogHeader>{title || 'Bạn có thông báo'}</DialogHeader>
      <DialogBody>{body}</DialogBody>
      <DialogFooter>
        {!onlyConf && (
          <Button variant='text' color='red' onClick={handleOpen} className='mr-1'>
            <span>{cancelText || 'Cancel'}</span>
          </Button>
        )}
        <Button variant='gradient' color='green' onClick={handleConfirm}>
          <span>{OkText || 'Confirm'}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default ModelDialog
