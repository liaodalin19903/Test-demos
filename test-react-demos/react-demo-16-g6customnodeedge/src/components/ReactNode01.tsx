import { ExtensionCategory, NodeData, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

import { Badge, Flex, Input, Tag, Typography } from 'antd';
const { Text } = Typography;
import { DatabaseFilled } from '@ant-design/icons';

register(ExtensionCategory.NODE, 'react', ReactNode);


export interface ReactNode01Data extends NodeData {
  data: {
    status: "success" | "warning" | "processing" | "error" | "default" | undefined,
    type: string,
    url: string
  }
}

export interface ReactNode01Props {
  data: ReactNode01Data, 
  onChange: (url: string) => void 
}

const ReactNode01 = (props: ReactNode01Props) => {

  const { data, onChange } = props 
  const { status, type } = data.data;

  return (

    <div style={{ width: '200px'}}> 
    <Flex
      style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        padding: 10,
        borderRadius: 5,
        border: '1px solid gray',
      }}
      vertical
    >
      <Flex align="center" justify="space-between">
        <Text>
          <DatabaseFilled />
          Server
          <Tag>{type}</Tag>
        </Text>
        <Badge status={status} />
      </Flex>
      <Text type="secondary">{data.id}</Text>
      <Flex align="center">
        <Text style={{ flexShrink: 0 }}>
          <Text type="danger">*</Text>URL:
        </Text>
        <Input
          style={{ borderRadius: 0, borderBottom: '1px solid #d9d9d9' }}
          variant="borderless"
          value={data.data?.url}
          onChange={(event) => {
            const url = event.target.value;
            onChange?.(url);
          }}
        />
      </Flex>
    </Flex>
    </div>
  );
};

export default ReactNode01