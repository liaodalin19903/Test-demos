import express, { Request, Response } from 'express';

import { getBlocks } from './notion/index2'

const app = express();
const port = 4000;



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/blocks/', async(req: Request, res: Response) => {


  const mdString = await getBlocks()

  const data = JSON.stringify(mdString)

  res.send(`${data}`) 

});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

