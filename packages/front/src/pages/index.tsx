import { Allotment } from 'allotment'
import type { MenuProps, TabsProps } from 'antd'
import { Layout, Menu, Tabs, theme } from 'antd'
import React, { useMemo, useState } from 'react'
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
      inlineCollapsed
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

export const Component: React.FC = () => {
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
        <Sider width={50} style={{ background: colorBgContainer }}>
          <CodeSider onSelect={onSelect} model={model} />
        </Sider>

        <Allotment defaultSizes={[200, contentWidth]}>
          <Allotment.Pane minSize={200}>
            <CodeMenu model={model} />
          </Allotment.Pane>
          <Allotment.Pane minSize={200}>
            <Allotment vertical defaultSizes={[contentWidth, 200]}>
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
                  Content
                </Content>
              </Allotment.Pane>

              <Allotment.Pane minSize={10}>Pane</Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
        </Allotment>
      </Layout>
    </Layout>
  )
}
