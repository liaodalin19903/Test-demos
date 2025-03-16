import express, { Request, Response } from 'express';
import { getdata_n2c, sync_c2n, page_exsist, getDbPages } from './notion/notion';
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
// 配置允许的源
const corsOptions = {
    origin: 'http://localhost:5173'
};
// 使用 cors 中间件，并传入配置对象
app.use(cors(corsOptions));

// 检查页面是否存在路由
app.get('/page_exsist', page_exsist);

// 同步路由
app.post('/sync_c2n', sync_c2n);

// 获取数据路由
app.get('/getdata_n2c', getdata_n2c);

// 获取数据库页面路由
app.get('/getdbpages', async (req: Request, res: Response) => {
  const { database_id, filter } = req.query;

  if (!database_id || !filter) {
    return res.status(400).json({ message: 'database_id and filter are required' });
  }

  try {
    const pages = await getDbPages(database_id, filter);
    return res.status(200).json(pages);
  } catch (error) {
    console.error('Error fetching pages from Notion:', error);
    return res.status(500).json({ message: 'Failed to fetch pages', error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app }