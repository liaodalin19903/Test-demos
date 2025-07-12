// 通关用神

import { useState, useEffect } from 'react';
import { Select, Checkbox, CheckboxOptionType, Row, Col } from 'antd';
const { Option } = Select;

import { EightChar, TianganDizhiChar, Wuxing } from "@shared/@types/eightChar/eightCharInfo";
import { getWuxingTongguanChar } from "../../tianganDizhiRoles/utils";



// 我：需要传入两种冲突的五行，然后给出结果
export const getEightCharTongguanYongshen = (
  wuxing1: Wuxing,
  wuxing2: Wuxing
): TianganDizhiChar[] => {

  const tongguanYongshen: TianganDizhiChar[] = getWuxingTongguanChar(wuxing1, wuxing2)
  return tongguanYongshen
};

// 生成通关用神节点
export const genTongguanYongshenNode = () => {
  const [selectedWuxing1, setSelectedWuxing1] = useState<Wuxing | null>(null);
  const [selectedWuxing2, setSelectedWuxing2] = useState<Wuxing | null>(null);
  const [tongguanChars, setTongguanChars] = useState<TianganDizhiChar[]>([]);
  const [isKeRelation, setIsKeRelation] = useState(false);

  // 五行选项
  const wuxingOptions: Wuxing[] = ['木', '火', '土', '金', '水'];

  // 当两个五行都选择时，检查是否相克并获取通关用神
  useEffect(() => {
    if (selectedWuxing1 && selectedWuxing2) {
      const keMap: Record<Wuxing, Wuxing> = {
        '木': '土', '火': '金', '土': '水', '金': '木', '水': '火'
      };

      // 检查是否相克关系
      const isKe = keMap[selectedWuxing1] === selectedWuxing2 ||
                  keMap[selectedWuxing2] === selectedWuxing1;

      setIsKeRelation(isKe);

      if (isKe) {
        const chars = getEightCharTongguanYongshen(selectedWuxing1, selectedWuxing2);
        setTongguanChars(chars);
      } else {
        setTongguanChars([]);
      }
    } else {
      setTongguanChars([]);
      setIsKeRelation(false);
    }
  }, [selectedWuxing1, selectedWuxing2]);

  // 将通关用神转换为复选框选项
  const convertToOptions = (): CheckboxOptionType[] => {
    return tongguanChars.map(char => ({
      label: char,
      value: char
    }));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
      <h3>通关用神选择器</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        选择两种相克的五行，系统会显示相应的通关用神
      </p>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Select
            placeholder="选择第一种五行"
            style={{ width: '100%' }}
            onChange={(value: Wuxing) => setSelectedWuxing1(value)}
            value={selectedWuxing1}
          >
            {wuxingOptions.map(wx => (
              <Option key={wx} value={wx}>{wx}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Select
            placeholder="选择第二种五行"
            style={{ width: '100%' }}
            onChange={(value: Wuxing) => setSelectedWuxing2(value)}
            value={selectedWuxing2}
          >
            {wuxingOptions.map(wx => (
              <Option key={wx} value={wx}>{wx}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      {selectedWuxing1 && selectedWuxing2 && !isKeRelation && (
        <div style={{ color: '#f5222d', marginBottom: '20px' }}>
          提示：{selectedWuxing1}和{selectedWuxing2}没有相克关系，不需要通关用神
        </div>
      )}

      {isKeRelation && (
        <div>
          <h4>通关用神（化解{selectedWuxing1}和{selectedWuxing2}相克）:</h4>
          <Checkbox.Group
            options={convertToOptions()}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
            提示：选择通关用神可以化解{selectedWuxing1}和{selectedWuxing2}的相克关系
          </div>
        </div>
      )}
    </div>
  );
};

