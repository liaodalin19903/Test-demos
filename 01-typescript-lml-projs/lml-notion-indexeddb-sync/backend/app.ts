import express, { Request, Response } from 'express';
import { getdata_n2c, sync_c2n } from './notion/notion';
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

// 同步路由
app.post('/sync_c2n', sync_c2n);

// 获取数据路由
app.get('/getdata_n2c', getdata_n2c);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

