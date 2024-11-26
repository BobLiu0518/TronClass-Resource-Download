# 畅课平台资源下载

本脚本可以下载畅课（一网畅学）的课程资源，即使老师设置了不可下载。

脚本目前只在上理工一网畅学平台测试过，如其他平台使用遇到问题，请发起 [Issue](https://github.com/BobLiu0518/TronClass-Resource-Download/issues)。

## 使用方法

1. 安装[篡改猴](https://www.tampermonkey.net/)；
2. 安装[脚本](https://greasyfork.org/zh-CN/scripts/518886-%E4%B8%80%E7%BD%91%E7%95%85%E5%AD%A6-%E7%95%85%E8%AF%BE-%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD)；
3. 打开畅课平台，点进需要下载的资源详情页；
4. 打开浏览器的 `开发者工具`，在 `终端(Console)` 标签页中可以看到解析结果；
5. 输入 `downloadResource(n)` 并按回车即可开始下载，其中 `n` 为解析结果序号。
