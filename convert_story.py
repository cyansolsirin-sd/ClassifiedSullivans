import os
import sys
import html

# 尝试导入 python-docx，如果没有安装则提示
try:
    import docx
except ImportError:
    docx = None

def convert_to_html(file_path):
    filename = os.path.basename(file_path)
    ext = os.path.splitext(filename)[1].lower()
    
    paragraphs = []

    if ext == '.docx':
        if docx is None:
            print("\n[错误] 处理 .docx 文件需要安装 python-docx 库。")
            print("请在命令行运行以下命令进行安装:")
            print("pip install python-docx")
            print("\n或者，您可以将内容复制到 .txt 文件中再试一次。")
            return None
        try:
            doc = docx.Document(file_path)
            for para in doc.paragraphs:
                if para.text.strip():
                    paragraphs.append(para.text.strip())
        except Exception as e:
            print(f"读取 Word 文档出错: {e}")
            return None
            
    elif ext == '.txt':
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.strip():
                        paragraphs.append(line.strip())
        except UnicodeDecodeError:
            # 尝试其他编码 (如 Windows 默认的 GBK)
            try:
                with open(file_path, 'r', encoding='gbk') as f:
                    for line in f:
                        if line.strip():
                            paragraphs.append(line.strip())
            except Exception as e:
                print(f"读取文本文件出错: {e}")
                return None
    else:
        print("不支持的文件格式。请使用 .docx 或 .txt 文件。")
        return None

    html_output = []
    
    # 定义样式类
    # 第一段的样式（首字下沉效果）
    first_p_class = 'first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-black leading-relaxed mb-6'
    # 普通段落样式
    normal_p_class = 'leading-relaxed mb-6'

    print(f"\n读取到 {len(paragraphs)} 个段落，正在转换...")

    for i, p_text in enumerate(paragraphs):
        # 转义 HTML 特殊字符 (防止 < > & 等符号破坏页面)
        safe_text = html.escape(p_text)
        
        # 简单的加粗处理：如果文本被 ** 包围，替换为 <strong>
        # 注意：这里只做最简单的处理，复杂的 markdown 不支持
        if safe_text.startswith("**") and safe_text.endswith("**"):
             safe_text = f"<strong>{safe_text[2:-2]}</strong>"

        if i == 0:
            html_output.append(f'<p class="{first_p_class}">\n    {safe_text}\n</p>')
        else:
            html_output.append(f'<p class="{normal_p_class}">\n    {safe_text}\n</p>')

    return "\n\n".join(html_output)

if __name__ == "__main__":
    print("==========================================")
    print("   OC Showcase 文本转 HTML 工具")
    print("==========================================")
    print("说明：")
    print("1. 支持 .docx (Word) 和 .txt (纯文本) 文件。")
    print("2. 自动为第一段添加首字下沉特效。")
    print("3. 自动处理换行和段落间距。")
    print("------------------------------------------")
    
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        # 获取当前目录下所有的 docx 和 txt 文件，方便用户选择
        files = [f for f in os.listdir('.') if f.endswith(('.docx', '.txt'))]
        if files:
            print("当前目录下的文件：")
            for idx, f in enumerate(files):
                print(f"{idx + 1}. {f}")
            print("------------------------------------------")
            
        input_file = input("请输入文件名或路径 (例如 story.docx): ").strip().strip('"\'')

    if not os.path.exists(input_file):
        print(f"\n[错误] 找不到文件: {input_file}")
    else:
        result = convert_to_html(input_file)
        
        if result:
            output_filename = "converted_story.html"
            with open(output_filename, "w", encoding="utf-8") as f:
                f.write(result)
            print(f"\n[成功] 已生成文件: {output_filename}")
            print("\n下一步操作：")
            print(f"1. 打开 {output_filename}")
            print("2. 全选并复制里面的内容")
            print("3. 打开 index.html")
            print("4. 找到 <article ...> 标签，替换里面的所有 <p> 标签内容")
