import os
import re

def count_typescript_classes_properties_methods(directory):
    class_count = 0
    property_count = 0
    method_count = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.ts'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.read()

                    # 统计类
                    class_matches = re.findall(r'class\s+(\w+)', content)
                    class_count += len(class_matches)

                    # 统计属性
                    property_matches = re.findall(r'(\w+)\s*:\s*(\w+);', content)
                    property_count += len(property_matches)

                    # 统计方法
                    method_matches = re.findall(r'(\w+)\s*\((.*?)\)\s*:', content)
                    method_count += len(method_matches)

    return class_count, property_count, method_count

# 指定要统计的项目目录
project_directory = '/Users/markleo/github_repos/node-tree-sitter'
class_count, property_count, method_count = count_typescript_classes_properties_methods(project_directory)
print(f'类的数量: {class_count}')
print(f'属性的数量: {property_count}')
print(f'方法的数量: {method_count}')

# 执行结果
"""
% python3 统计typescript项目类属性方法数量.py
类的数量: 559
属性的数量: 5195
方法的数量: 9093
"""

