import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import React, { useMemo } from 'react'
import { Allotment } from 'allotment'
import styles from './index.module.scss'

const { Header, Content, Sider } = Layout

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`
}))

const items2: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`
      }
    })
  }
})

export const Component: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const contentWidth = useMemo(() => window.innerWidth - 250, [])

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}></Header>

      <Layout>
        <Sider width={50} style={{ background: colorBgContainer }}>
          sider
        </Sider>

        <Allotment defaultSizes={[200, contentWidth]}>
          <Allotment.Pane minSize={200}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
          </Allotment.Pane>
          <Allotment.Pane minSize={200}>
            <Allotment vertical>
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
