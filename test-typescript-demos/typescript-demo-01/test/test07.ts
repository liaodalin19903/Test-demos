


import dotenv from 'dotenv'

dotenv.config()

console.log(process.env)  // 包含：.env中定义的变量
console.log(process.env.S3_BUCKET) 
console.log(process.env.SECRET_KEY) 


