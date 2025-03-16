import { describe, it, expect } from 'vitest';
import request from 'supertest';

describe('POST /sync_c2n', () => {
  it.skip('should update an existing page', async () => {
    const requestBody = {
      database_id: '1acdeaa8cb4b8098a2ace32e51ba6508',
      key: '101',
      value: {"content":"茄子x2, 菜板x2","uid":"1001","create_time":"2025-03-05T09:22:00.337Z","update_time":"2025-03-05T09:22:00.337Z","oid":3}
    };

    // 模拟 notion.databases.query 返回一个结果
    // 这里假设您已经在服务器端模拟了 notion 客户端的行为
    const response = await request('http://localhost:3000')
      .post('/sync_c2n')
      .send(requestBody);

    // 验证响应
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Sync completed successfully' });
  });

  it.skip('should create a new page if it does not exist', async () => {
    const requestBody = {
      database_id: '1acdeaa8cb4b8098a2ace32e51ba6508',
      key: '102',
      value: {"content":"茄子x2, 菜板x2","uid":"1001","create_time":"2025-03-05T09:22:00.337Z","update_time":"2025-03-05T09:22:00.337Z","oid":3}
    };

    // 模拟 notion.databases.query 返回空结果
    // 这里假设您已经在服务器端模拟了 notion 客户端的行为
    const response = await request('http://localhost:3000')
      .post('/sync_c2n')
      .send(requestBody);

    // 验证响应
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'New page created successfully' });
  });

});