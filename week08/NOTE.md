# 每周总结可以写在这里

### 选择器分类

- 简单选择器
- 复合选择器
- 复杂选择器
- 选择器列表

**简单选择器**

**_针对某一特征判断是否选中元素_**
![运行结果](./images/1.png)

```html
// 类型选择器 div { }
```

还必须要考虑 HTML 或者 XML 元素的命名空间问题。svg 和 HTML 中都有 a 元素，我们若要想区分选择 svg 中的 a 和 HTML 中的 a，就必须用带命名空间的类型选择器。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <body>
    <svg
      width="100"
      height="28"
      viewBox="0 0 100 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <desc>Example link01 - a link on an ellipse</desc>
      <a xlink:href="http://www.w3.org">
        <text y="100%">name</text>
      </a>
    </svg>
    <br />
    <a href="javascript:void 0;">name</a>
  </body>
</html>

@namespace svg url(http://www.w3.org/2000/svg); @namespace html
url(http://www.w3.org/1999/xhtml); svg|a { stroke:blue; stroke-width:1; } html|a
{ font-size:40px }
```

**id 选择器与 class 选择器**

```html
  #app {
    font-size: 16px;
  }

  .container {
    color: red;
  }
```

**属性选择器**

  * [att] 直接在方括号中放入属性名，是检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中。
  * [att=val] 精确匹配，检查一个元素属性的值是否是 val。
  * [att~=val] 多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列。
  * [att!=val] 开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管。

<u>有些 HTML 属性含有特殊字符，这个时候，可以把 val 用引号括起来，形成一个 CSS 字符串。CSS 字符串允许使用单双引号来规避特殊字符，也可以用反斜杠转义，这样，就可以表示出任意属性值啦。<u>
