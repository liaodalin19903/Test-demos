import re
"""
目前方法统计得到结果不正确
"""

def count_go_elements(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

        # 统计结构体
        struct_pattern = re.compile(r'type\s+(\w+)\s+struct')
        struct_names = struct_pattern.findall(content)
        struct_count = len(set(struct_names))  # 使用集合去重

        # 统计字段
        field_pattern = re.compile(r'(\w+)\s+(\w+)')
        fields = field_pattern.findall(content)
        field_count = len(fields)

        # 统计方法
        method_pattern = re.compile(r'func\s+\((.*?)\)\s+(\w+)\s*\((.*?)\)\s+(.*?)\s*{')
        methods = method_pattern.findall(content)
        method_count = len(methods)

    return struct_count, field_count, method_count

# 指定要统计的 Go 语言文件路径
file_path = '/Users/markleo/github_repos/kubernetes/pkg/kubelet/config/file_linux.go'

struct_count, field_count, method_count = count_go_elements(file_path)
print(f'结构体数量: {struct_count}')
print(f'字段数量: {field_count}')
print(f'方法数量: {method_count}')

