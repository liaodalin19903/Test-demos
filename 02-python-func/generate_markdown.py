import random
import string


def random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))


def generate_json(index):
    json_template = f"""{{
    \t"title": "{str(index).zfill(4)} | {random_string(10)}",
    \t"详细信息": "{random_string(20)}",
    \t"匹配函数": "",
    \t"评价": []
}}"""
    return json_template


markdown_content = ""
for i in range(1, 201):  # 修改为生成200个条目
    if i == 1:
        markdown_content += f">{str(i).zfill(4)}\n\n    ```json\n{generate_json(i)}    \n```\n\n"
    else:
        markdown_content += f">{str(i).zfill(4)}\n\n    ```json\n{generate_json(i)}    \n```\n\n"

# 将生成的 Markdown 内容保存到文件
with open('/Users/markleo/Downloads/generated_data.md', 'w', encoding='utf-8') as f:
    f.write(markdown_content)

print("Markdown 文件已生成，文件名为 generated_data.md")