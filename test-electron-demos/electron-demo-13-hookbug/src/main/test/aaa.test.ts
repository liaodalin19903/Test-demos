import { readFile } from 'fs/promises' // 使用 fs.promises 模块
import { join } from 'path'
import { it, expect } from 'vitest'

it('example test', () => {
  expect(1 + 1).toBe(2)
})

it('should read file content correctly', async () => {
  try {
    const filePath = join(__dirname, '../../test.txt') // 构造文件路径
    const content = await readFile(filePath, 'utf-8') // 异步读取文件内容
    expect(content.trim()).toBe('111') // 去除可能的换行符后比较
  } catch (error) {
    console.error('File reading error:', error) // 捕获并打印错误
    throw error // 重新抛出错误以便测试框架捕获
  }
})
