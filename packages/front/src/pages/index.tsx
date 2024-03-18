import { Allotment } from 'allotment'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import Models from '../model'
const { Header, Content, Sider } = Layout
type Models = typeof Models
type ModelKey = keyof Models
type MenuItem = Required<MenuProps>['items'][number]
const CodeSider = (props: {
  onSelect: (key: string) => void
  model: ModelKey
}) => {
  const items: MenuItem[] = Object.entries(Models)
    .filter(([, comps]) => comps.Sider)
    .map(([key, comps]) => {
      const Sider = comps.Sider!
      const item: MenuItem = {
        key: key,
        label: key,
        icon: <Sider />
      }
      return item
    })
  return (
    <Menu
      items={items}
      mode='inline'
      defaultSelectedKeys={[props.model]}
      onSelect={({ key }) => props.onSelect(key)}
    />
  )
}
const CodeMenu = (props: { model: ModelKey }) => {
  const MyMenu = Models[props.model].Menu
  if (!MyMenu) {
    return Models['Default'].Menu
  }
  return <MyMenu />
}
const CodePane = (props: { model: ModelKey }) => {
  let MyPane = Models[props.model].Pane
  if (!MyPane) {
    MyPane = Models['Default'].Pane
  }
  return <MyPane />
}
const CodeTerminal = (props: { model: ModelKey }) => {
  let MyTerminal = Models[props.model].Terminal
  if (!MyTerminal) {
    MyTerminal = Models['Default'].Terminal
  }
  return <MyTerminal />
}

export const Component = observer(() => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorTextLabel }
  } = theme.useToken()
  const [model, setModel] = useState<keyof typeof Models>('File')
  const contentWidth = useMemo(() => window.innerWidth - 250, [])
  const contentHeight = useMemo(() => window.innerHeight - 64, [])
  const onSelect = (key: string) => {
    setModel(key as ModelKey)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}></Header>

      <Layout>
        <Sider width={50} style={{ background: colorBgContainer }} collapsed>
          <CodeSider onSelect={onSelect} model={model} />
        </Sider>

        <Allotment defaultSizes={[200, contentWidth]}>
          <Allotment.Pane minSize={200}>
            <CodeMenu model={model} />
          </Allotment.Pane>
          <Allotment.Pane minSize={200}>
            <Allotment vertical defaultSizes={[contentHeight, 200]}>
              <Allotment.Pane>
                <Content
                  style={{
                    padding: 0,
                    margin: 0,
                    minHeight: 'calc(100vh - 154px)',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG
                  }}
                >
                  <CodePane model={model} />
                </Content>
              </Allotment.Pane>

              <Allotment.Pane minSize={10}>
                <CodeTerminal model={model} />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
        </Allotment>
      </Layout>
    </Layout>
  )
})
