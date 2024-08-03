import os
import re

def count_go_classes_properties_methods(directory):
    class_count = 0
    property_count = 0
    method_count = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.go'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.read()

                    # Go 语言没有类的概念，通常使用结构体替代
                    struct_matches = re.findall(r'type\s+(\w+)\s+struct', content)
                    class_count += len(struct_matches)

                    # 统计字段（类似于属性）
                    field_matches = re.findall(r'(\w+)\s+(\w+)', content)
                    property_count += len(field_matches)

                    # 统计方法
                    method_matches = re.findall(r'func\s+\((.*?)\)\s+(\w+)\s*\((.*?)\)\s*{', content)
                    method_count += len(method_matches)

    return class_count, property_count, method_count

# 指定要统计的项目目录
project_directory = '/Users/markleo/github_repos/kubernetes/pkg'
class_count, property_count, method_count = count_go_classes_properties_methods(project_directory)
print(f'结构体的数量: {class_count}')
print(f'字段的数量: {property_count}')
print(f'方法的数量: {method_count}')

