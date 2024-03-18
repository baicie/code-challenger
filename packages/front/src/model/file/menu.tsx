import { Button } from 'antd'
import { forwardRef, useCallback } from 'react'

export const Menu = forwardRef((props, ref) => {
  const getFile = useCallback(async () => {
    const dirHandle = await window.showDirectoryPicker()
    console.log('dirHandle', dirHandle)

    getDirectoryTree(dirHandle).then((res) => {
      console.log('res', res)
    })
  }, [])
  return (
    <Button onClick={getFile} type='primary'>
      pick
    </Button>
  )
})

async function getDirectoryTree(directoryHandle: any): Promise<any> {
  const directoryTree = {
    name: directoryHandle.name,
    kind: directoryHandle.kind,
    children: [] as any[]
  }

  for await (const entry of directoryHandle.values()) {
    if (entry.kind === 'file') {
      directoryTree.children.push({
        name: entry.name,
        kind: entry.kind
      })
    } else if (entry.kind === 'directory') {
      directoryTree.children.push(await getDirectoryTree(entry))
    }
  }

  return directoryTree
}
