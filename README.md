# 畅课平台资源下载

本脚本可以下载畅课（一网畅学）的课程资源，即使老师设置了不可下载。

脚本目前只在上理工一网畅学平台测试过，如其他平台使用遇到问题，请发起 [Issue](https://github.com/BobLiu0518/TronClass-Resource-Download/issues)。

## 使用方法

1. 安装[篡改猴](https://www.tampermonkey.net/)；
2. 安装[脚本](https://greasyfork.org/zh-CN/scripts/518886)；
3. 打开畅课平台，点进需要下载的资源**详情页**，即点击**章节**/**课件**的标题（注意不是“查看文件”按钮）；
4. 此时在资源后方应该能看到“下载”按钮，点击即可下载。

如果没有看到下载按钮：

5. 打开浏览器的 `开发者工具`，在 `终端(Console)` 标签页中可以看到解析结果；
6. 输入 `downloadResource(n)` 并按回车即可开始下载，其中 `n` 为解析结果序号。
