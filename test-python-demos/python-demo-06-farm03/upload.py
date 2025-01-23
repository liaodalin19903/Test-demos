# -*- coding: utf-8 -*-
import json
import base64
import oss2
from oss2.credentials import EnvironmentVariableCredentialsProvider

# 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量 OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET
auth = oss2.ProviderAuthV4(EnvironmentVariableCredentialsProvider())

# 填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
endpoint = "https://oss-cn-beijing.aliyuncs.com"

# 填写Endpoint对应的Region信息，例如cn-hangzhou。注意，v4签名下，必须填写该参数
region = "cn-beijing"

# yourBucketName填写存储空间名称。
bucket = oss2.Bucket(auth, endpoint, "yumiao-bj", region=region)

# 定义回调参数Base64编码函数。
def encode_callback(callback_params):
    cb_str = json.dumps(callback_params).strip()
    return oss2.compat.to_string(base64.b64encode(oss2.compat.to_bytes(cb_str)))

# 设置上传回调参数。
callback_params = {}
# 设置回调请求的服务器地址，例如http://oss-demo.aliyuncs.com:23450。
callback_params['callbackUrl'] = 'http://120.55.81.105:8000/callback'
#（可选）设置回调请求消息头中Host的值，即您的服务器配置Host的值。
#callback_params['callbackHost'] = 'yourCallbackHost'
# 设置发起回调时请求body的值。
callback_params['callbackBody'] = 'bucket=${bucket}&object=${object}'
# 设置发起回调请求的Content-Type。
callback_params['callbackBodyType'] = 'application/x-www-form-urlencoded'
encoded_callback = encode_callback(callback_params)
# 设置发起回调请求的自定义参数，由Key和Value组成，Key必须以x:开始。
callback_var_params = {'x:my_var1': 'my_val1', 'x:my_var2': 'my_val2'}
encoded_callback_var = encode_callback(callback_var_params)

# 上传回调。
params = {'x-oss-callback': encoded_callback, 'x-oss-callback-var': encoded_callback_var}
# 填写Object完整路径和字符串。Object完整路径中不能包含Bucket名称。
result = bucket.put_object('examplefiles/exampleobject2.txt', 'a'*1024*1024, params)