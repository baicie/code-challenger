import { WebContainer } from '@webcontainer/api'

let webcontainerInstance: WebContainer | undefined

export const init = async () => {
  console.log('init')

  try {
    if (!webcontainerInstance) {
      webcontainerInstance = await WebContainer.boot()
    }
  } catch (error) {
    throw error
  }
}
