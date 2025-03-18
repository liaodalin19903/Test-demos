import React, { useState } from 'react';
import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm, Form, Input } from 'antd';

const App2: React.FC = () => {
    const [form] = Form.useForm();

    const confirm = (e: any) => {
        form.validateFields().then((values) => {
            console.log('表单内容:', values);
            message.success('点击了确认');
            console.log(e);
        }).catch((errorInfo) => {
            console.log('表单验证失败:', errorInfo);
            message.error('表单信息填写不完整，请检查！');
        });
    };

    const cancel = (e: unknown) => {
        console.log(e);
        message.error('点击了取消');
    };

    return (
        <Popconfirm
            title="Delete the task"
            description={(
                <Form form={form}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: '请输入名称' }]}
                    >
                        <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item
                        name="path"
                        rules={[{ required: true, message: '请输入路径' }]}
                    >
                        <Input placeholder="请输入路径" />
                    </Form.Item>
                </Form>
            )}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>Delete</Button>
        </Popconfirm>
    );
};

export default App2;
    