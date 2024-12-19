
1、里面的TabsContent 都基于基本tabs-main-content模板（= main/apis/index.tsx模板）开发

2、tabs-main-content模板有：
1）主要内容区
2）右侧设置区
  a.信息区
  b.设置区

3、比如：
main/apis
main/architectures
main/classes
main/modules
main/requirements

都会被引入到main.tabs.ts 的children字段进行配置。


