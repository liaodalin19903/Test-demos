import os
import ast

"""
不确定是否正确
"""

def count_elements_in_file(file_path):
    with open(file_path, 'r') as file:
        source_code = file.read()
        tree = ast.parse(source_code)

        class_count = 0
        attribute_count = 0
        method_count = 0

        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                class_count += 1
                for subnode in node.body:
                    if isinstance(subnode, ast.FunctionDef):
                        if subnode.name.startswith('__') and subnode.name.endswith('__'):
                            continue
                        method_count += 1
                    elif isinstance(subnode, ast.Assign):
                        attribute_count += len(subnode.targets)

    return class_count, attribute_count, method_count

def count_elements_in_project(directory):
    total_class_count = 0
    total_attribute_count = 0
    total_method_count = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                class_count, attribute_count, method_count = count_elements_in_file(file_path)
                total_class_count += class_count
                total_attribute_count += attribute_count
                total_method_count += method_count

    return total_class_count, total_attribute_count, total_method_count

project_directory = '/Users/markleo/github_repos/openstack/nova/nova'
class_count, attribute_count, method_count = count_elements_in_project(project_directory)
print(f'类的数量: {class_count}')
print(f'属性的数量: {attribute_count}')
print(f'方法的数量: {method_count}')