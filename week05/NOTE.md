# 每周总结可以写在这里

## Realm Object
[Realm Object可视化](https://codesandbox.io/s/little-lake-31s9r?file=/index.html)

## 浏览器工作原理

七层网络协议(OSI)

* 应用层
* 表示层
* 会话层
* 传输层
* 网络层
* 数据链路层

>HTTP协议

    HTTP 是基于 TCP/IP 协议的应用层协议。它不涉及数据包（packet）传输，主要规定了客户端和服务器之间的通信格式，默认使用80端口。
    > 1. HTTP/0.9 最早版本是1991年发布的0.9版，最初的协议只能HTML格式的字符串，不能回应其他格式, 只有GET方式。
    > 2. HTTP/1.0 任何格式的内容都可以发送。这使得互联网不仅可以传输文字，还能传输图像、视频、二进制文件。这为互联网的大发展奠定了基础。
       除了GET方式外还加入了POST和HEAD方式。

>HTTP方法

> + GET
> + POST
> + HEAD
> + PUT
> + DELETE
> + CONNECT
> + OPTION
> + STRACE

>HTTP状态码

| 分类  | 分类描述  |
| ----  | ----    |
|1**	|信息，服务器收到请求，需要请求者继续执行操作|
|2**	|成功，操作被成功接收并处理|
|3**	|重定向，需要进一步的操作以完成请求|
|4**	|客户端错误，请求包含语法错误或无法完成请求|
|5**	|服务器错误，服务器在处理请求的过程中发生了错误|

>HTTP 头（Header）

    请求头（Request Header）

    GET / HTTP/1.0
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
    Accept: */*

    响应头（Response Header）

    HTTP/1.0 200 OK 
    Content-Type: text/plain
    Content-Length: 137582
    Expires: Thu, 05 Dec 1997 16:00:00 GMT
    Last-Modified: Wed, 5 August 1996 15:55:28 GMT
    Server: Apache 0.84

   > >Content-Type

    常见的媒体格式类型如下：
      text/html ： HTML格式
      text/plain ：纯文本格式
      text/xml ： XML格式
      image/gif ：gif图片格式
      image/jpeg ：jpg图片格式
      image/png：png图片格式
    以application开头的媒体格式类型：
      application/xhtml+xml ：XHTML格式
      application/xml： XML数据格式
      application/atom+xml ：Atom XML聚合格式
      application/json： JSON数据格式
      application/pdf：pdf格式
      application/msword ： Word文档格式
      application/octet-stream ： 二进制流数据（如常见的文件下载）
      application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
    另外一种常见的媒体格式是上传文件之时使用的：
      multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
