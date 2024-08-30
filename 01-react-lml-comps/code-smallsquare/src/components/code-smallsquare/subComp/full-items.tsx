import { calc } from 'antd/es/theme/internal'
import React, {useState} from 'react'
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { ItemType } from 'antd/es/menu/interface';
import { Card, Divider, Radio, Checkbox, Cascader, Button } from 'antd'
import type { RadioChangeEvent } from 'antd';
import type { CheckboxProps } from 'antd';
import type { CascaderProps, GetProp } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';



import { Space, Typography } from 'antd';
const { Text, Link } = Typography;

type FileItemType = {
  fileName: string, 
  className?: string | null, // 类名（所属）
  itemName: string, // 属性名 or 方法名
  selected?: boolean  
}

export type FullItemsProps = {
  width?: number, // 整个相1宽度，默认填满父级
  items: FileItemType[], 
}

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

export default function FullItems(props: FullItemsProps) {
  
  const [itemData, setItemData] = useState<FileItemType[]>(props.items)

  const [selectedIndex, setSelectedIndex] = useState<number>()

  const [mouseOverItemData, setMouseOverItemData] = useState<FileItemType|null>()

  //#region 单选框的选择: 流经过、本desc
  const [radioValue, setRadioValue] = useState(0);

  const onRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  }

  //#endregion

  //#region checkbox的选择：
  const onDisplayFileRangeChange = (e: CheckboxChangeEvent) => {
    console.log(e.target.checked)
  }

  //#endregion

  const itemClickHandler = (item: FileItemType, index: number) => {
    
    //#region 设置选中的index和更新itemData
    let tmpItemData = itemData

    if(selectedIndex) {
      if(selectedIndex !== index) {
        tmpItemData[selectedIndex].selected = false
        tmpItemData[index].selected = true
        setSelectedIndex(index) 
      }else {
        tmpItemData[selectedIndex].selected = !tmpItemData[selectedIndex].selected
        setSelectedIndex(tmpItemData[selectedIndex].selected ? index : undefined)
      } 
    }else {
      tmpItemData[index].selected = true
      setSelectedIndex(index) 
    }

    // 更新ItemData
    setItemData(tmpItemData)

    //#endregion
  }

  const itemMouseOverHandler = (item: FileItemType | null, index: number | undefined) => {
    console.log("lml: ", item, index)
    setMouseOverItemData(item)
  }

  //#region 功能流：搜索
  const flowFilter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  //#endregion
  
  return (
    
    <div id="container" style={{
      width: '100%',
      height: '600px'
    }}>
    <Allotment defaultSizes={[200, 100]}>
      <Allotment.Pane>
        <Card 
          bordered={false}
          style={{
            height: '100%'
          }}
        >
          <div id="left" style={{ 
          width: 'calc(100% - 200px)',
          height: '100%',
          //backgroundColor: 'gray', 
          float: 'left',
          textAlign: 'left'
          }}>
          <Allotment.Pane>
            <div>
              <Radio.Group onChange={onRadioChange} value={radioValue}>
                <Radio value={0}>清空</Radio>
                <Radio value={1}>流经过</Radio>
                <Radio value={2}>自描述</Radio>
              </Radio.Group>
            </div>
            <div>
              <Checkbox onChange={onDisplayFileRangeChange}>
                显示文件范围
              </Checkbox>
            </div>
            <Divider/>
          </Allotment.Pane>
          
          <Allotment.Pane>
          
            <div style={{ overflow: 'hidden' }}>
              <div 
                id="left-linenumber"
                style={{ 
                  position: 'absolute',
                  // left: 0,
                  // top: 0,
                  width: '25px',
                  marginTop: '-2px',
                  overflow: 'hidden'
                 }}
              >
                {
                  Array.from({length: Math.ceil(itemData.length/5)}).map((_, index) => (
                    <div 
                      key={index}
                      style={{
                        fontSize: "6px",
                        width: "26px",
                        height: "9px",
                        margin: "4px",
                        // backgroundColor: 'red',
                        textAlign: 'center',
                      }}
                    >
                      {index + 1}
                    </div>
                  ))
                }

              </div>
              <div 
                id="right-itemcontainer"
                 style={{
                  marginLeft: '24px'
                 }}
                >

              { itemData.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'inline-block',
                    width: '9px', 
                    height: '9px', 
                    margin: '2px',
                    float: 'left',
                    backgroundColor: item.selected ? 'green' : 'lightgreen'
                  }}
                    onMouseOver={() => {
                      itemMouseOverHandler(item, index)
                    }}

                    onMouseLeave={() => {
                      itemMouseOverHandler(null, undefined)
                    }}

                    onClick={() => {
                      itemClickHandler(item, index)
                    }}
                  ></div>
                )) }
              </div>
            </div>

          </Allotment.Pane>
          </div>
        </Card>
      </Allotment.Pane>
      <Allotment.Pane>
        <Card>
          <div id="right" style={{ 
            width: '100%', 
            height: '100%',
            // backgroundColor: 'red',
            float: 'right'  
            }}>
              {/* 展示mouseover的 item的信息 */}
              <div 
                id="displayinfo" 
                style={{ 
                  height: '60px',
                  backgroundColor: '#green', 
                }}
                >
                <Space style={{ backgroundColor: '#green', width: '100%' }} direction="vertical" align='start'>
                  
                  { selectedIndex ?
                    <>
                    <Text >文件名: {itemData[selectedIndex].fileName}</Text>
                    <Text >类名: {itemData[selectedIndex].className}</Text>
                    <Text >属性/方法名: {itemData[selectedIndex].itemName}</Text>
                    </>
                    :
                    <>
                    <Text >文件名: {mouseOverItemData?.fileName}</Text>
                    <Text >类名: {mouseOverItemData?.className}</Text>
                    <Text >属性/方法名: {mouseOverItemData?.itemName}</Text>
                    </>
                  }
                </Space>
              </div>
              <Divider></Divider>
              <div id="flowcontainer">
                  <div 
                    id='flow-controls'
                    style={{
                      float: 'left'
                    }}
                  >
                    <Cascader
                      placeholder="请输入流名称"
                      showSearch={{  }}  // 过滤的方法 TODO: 需要参考 react-test-demos/react-demo-04-antdfilter  配置参数Type
                      onSearch={(value) => {
                        console.log(value)
                      }}
                    />
                    <div style={{
                      display: 'inline-block',
                      marginLeft: '20px'
                    }}>
                      <Button onClick={() => {
                        
                      }}>查看流描述说明</Button>
                    </div>
                  </div>
                  <div id='flow-diagram'></div>
              </div>

            </div>
        </Card>
      </Allotment.Pane>

      </Allotment>
    </div>
  )
}
