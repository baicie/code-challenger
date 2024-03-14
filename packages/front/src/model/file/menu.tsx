declare global {
  interface Window {
    showOpenFilePicker: any
    showDirectoryPicker: any
  }
}
import { Button } from 'antd'
import { forwardRef, useCallback } from 'react'

export const Menu = forwardRef((props, ref) => {
  const getFile = useCallback(async () => {
    console.log('getFile')
    const [fileHandle] = await window.showOpenFilePicker()
    const file = await fileHandle.getFile()
    console.log(file)

    return file
  }, [])
  return (
    <Button onClick={getFile} type='primary'>
      pick
    </Button>
  )
})
