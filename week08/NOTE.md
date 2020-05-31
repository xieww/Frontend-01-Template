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
  * [attr|=val] 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。
  * [attr^=val] 匹配属性值以指定值开头的每个元素。
  * [attr$=val] 匹配属性值以指定值结尾的每个元素。
  * [attr*=val] 匹配属性值中包含指定值的每个元素

*有些 HTML 属性含有特殊字符，这个时候，可以把 val 用引号括起来，形成一个 CSS 字符串。CSS 字符串允许使用单双引号来规避特殊字符，也可以用反斜杠转义，这样，就可以表示出任意属性值啦。*

**伪类选择器**

树结构关系伪类选择器  
* :empty 伪类表示没有子节点的元素，这里有个例外就是子节点为空白文本节点的情况。
* :nth-child 和 :nth-last-child 这是两个函数型的伪类。

| 选择器 | 结果 |
| :-----| ----: |
| :nth-child(even) | 选择偶数节点 |
| :nth-child(4n-1) | 选择第3个、第7个、第11个这样复合4的倍数减一的数字 |
| :nth-child(3n+1 of li.important) | 选择第1个、第4个、第7个li.important,注意这里只有li.important会被计数 |

* :nth-last-child 的区别仅仅是从后往前数。
* :first-child :last-child 分别表示第一个和最后一个元素。
* :only-child 按字面意思理解即可，选中唯一一个子元素。

**链接与行为伪类选择器**

* :any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。
* :link 表示未访问过的链接
* :visited 表示已经访问过的链接。
* :hover 表示鼠标悬停在上的元素。
* :active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。
* :focus 表示焦点落在这个元素之上。
* :target 用于选中浏览器 URL 的 hash 部分所指示的元素。