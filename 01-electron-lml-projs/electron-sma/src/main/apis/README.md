
#### 简介


#### 编写原则

命名规范：
比如：user.ts中的api，请使用user开头：
userCreate
userById

windows.ts


#### 知识点
1.两种api类型
1) 通过trpc，让渲染进程写客户端api接受
2）直接是方法（例如：mainToRenderer），让主进程调用
注意：不能在这里面导出（会报错： TypeError: Cannot use 'in' operator to search for 'router' in undefined）
src/main/apis/index.ts

到时候
