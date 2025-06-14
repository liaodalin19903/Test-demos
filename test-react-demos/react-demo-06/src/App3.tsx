import { Col, Row } from 'antd';
import React from 'react';

export default function App3() {
  return (

      <div 
        style={{ 
          overflow: 'auto',
          width: '100%',
          backgroundColor: 'red',
          padding: 8,
        }}
      >
        {/* 第一行 */}
        <Row 
          gutter={8} 
          style={{ 
            flexWrap: 'nowrap',
            minWidth: 'max-content',
          }}
        >
          {/* 为每个Col设置固定宽度 */}
          <Col style={{ minWidth: 80 }}>111</Col>
          <Col style={{ minWidth: 80 }}>222</Col>
          <Col style={{ minWidth: 80 }}>333</Col>
          <Col style={{ minWidth: 80 }}>444</Col>
          <Col style={{ minWidth: 80 }}>555</Col>
          <Col style={{ minWidth: 80 }}>666</Col>
          <Col style={{ minWidth: 80 }}>777</Col>
          <Col style={{ minWidth: 80 }}>888</Col>
          <Col style={{ minWidth: 80 }}>999</Col>
          <Col style={{ minWidth: 80 }}>10-10-10</Col>
        </Row>
        
        {/* 第二行 */}
        <Row 
          gutter={8} 
          style={{ 
            flexWrap: 'nowrap',
            minWidth: 'max-content',
            marginTop: 16,
          }}
        >
          <Col style={{ minWidth: 80 }}>111</Col>
          <Col style={{ minWidth: 80 }}>222</Col>
          <Col style={{ minWidth: 80 }}>333</Col>
          <Col style={{ minWidth: 80 }}>444</Col>
          <Col style={{ minWidth: 80 }}>555</Col>
          <Col style={{ minWidth: 80 }}>666</Col>
          <Col style={{ minWidth: 80 }}>777</Col>
          <Col style={{ minWidth: 80 }}>888</Col>
          <Col style={{ minWidth: 80 }}>999</Col>
          <Col style={{ minWidth: 80 }}>10-10-10</Col>
        </Row>
      </div>
      
     
  );
}