

###### 简介
基于node-tree-sitter对常用面向对象语言的通用功能封装
https://boardmix.cn/app/share?token=CAE.CMbf_wsgASoQIdqGNXt1G3U1E_ARzAMfQjAFQAE&otherNodeGuid=151:2 

###### 功能（面向对象的通用功能）

1、类相关
	获取所有类名
	获取指定类下面所有属性和方法
2、获取所有方法/函数名
3、继承关系
	获取类的继承链
	获取整个项目内所有文件内类的继承关系
4、获取方法的调用链
	上面哪些方法调用了此指定方法
	本方法调用了哪些子方法（如果没有调用其他子方法，那么自己就是基元方法）

  
###### 项目说明
1）src/OOPAstProsor.ts 
面向对象语言的AST处理器. oop languages ast processor

2）support_languages
支持的语言

###### 依赖
编程语言识别库





