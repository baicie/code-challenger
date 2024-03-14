import { Button } from 'antd'
import { forwardRef, useCallback } from 'react'

export const Menu = forwardRef((props, ref) => {
  const getFile = useCallback(async () => {
    const dirHandle = await window.showDirectoryPicker()
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile()
        console.log(file)
      } else {
        console.log(entry)
      }
    }
  }, [])
  return (
    <Button onClick={getFile} type='primary'>
      pick
    </Button>
  )
})
