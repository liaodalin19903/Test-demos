import { describe, expect, it } from "vitest";

import axios from 'axios';


describe('msw.test.ts', () => {
  it('shoudl worl', async () => {

    // 发送 GET 请求
    const response = await axios.get('https://demo.example/path/to/posts')
    
    console.log(response.data);
    expect(response.data.length).toBe(1)

  })
})