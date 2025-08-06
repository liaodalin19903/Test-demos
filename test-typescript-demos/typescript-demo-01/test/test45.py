# -*- coding: utf-8 -*-
import oss2
from oss2.credentials import EnvironmentVariableCredentialsProvider
# 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。

auth = oss2.Auth('---', '---') 

# 填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
endpoint = "https://oss-cn-beijing.aliyuncs.com"
# 填写Endpoint对应的Region信息，例如cn-hangzhou。注意，v4签名下，必须填写该参数
region = "cn-beijing"

# examplebucket填写存储空间名称。
bucket = oss2.Bucket(auth, endpoint, "yumiao-bj", region=region)

# 查看生命周期规则。
lifecycle = bucket.get_bucket_lifecycle()

print('lifecycle:', lifecycle.rules)


# 复制给：markleoooooooo 

endpoint2 = 'https://oss-cn-hangzhou.aliyuncs.com'
region2 = 'cn-hangzhou'

bucket2 = oss2.Bucket(auth, endpoint2, "markleoooooooo ", region=region2)

res = bucket2.put_bucket_lifecycle(
  input=lifecycle,
  headers={
    'x-oss-allow-same-action-overlap': 'true' 
  },
  )
print('res:', res)

