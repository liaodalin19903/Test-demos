import React, { useEffect } from 'react'
import { Button, Card, Col, Flex, Modal, Row, Space, Statistic } from 'antd';
import CRUDModal from '@renderer/components/CRUDModal';
import { useCreateModuleProps } from './hooks/useCRUDModulesProps';


// 模块设置

export default function ModulesSettings() {

  const [modal, contextHolder] = Modal.useModal();
  const createModuleProps = useCreateModuleProps()

  useEffect(() => {
    //
  }, [])

  const handleCreate = () => {
    CRUDModal(modal, createModuleProps)
  }

  return (
    <div style={{ overflow: 'auto', padding: '10px', height: 'calc(100vh - 56px)' }} >
      <Flex gap="small" vertical >
        <Card size="small" title="条件搜索🔍" bordered={false} >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </Card>
        <Card size="small" title="模块信息" bordered={false} >
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="nodes" value={112} />
              </Col>
              <Col span={8}>
                <Statistic title="edges" value={98} />
              </Col>
              <Col span={8}>
                <Statistic title="combos" value={12} />
              </Col>
            </Row>
          </div>
          <Space direction="vertical">
          <div>
            <Button
              size='small' color="primary" variant="solid"
              onClick={handleCreate}
            >
              增加模块
            </Button>
          </div>
          <div>
            <Space>
              <Button disabled size='small' color="primary" variant="solid" >
                修改模块
              </Button>
              <Button disabled size='small' color="primary" variant="solid" >
                增加代码块
              </Button>
            </Space>
          </div>
          </Space>

        </Card>

        <Card size="small" title="关联图" bordered={false} >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </Card>
        <Card size="small" title="其他" bordered={false} >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </Card>
      </Flex>
      {contextHolder}
    </div>
  )
}
