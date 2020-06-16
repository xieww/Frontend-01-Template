# 每周总结可以写在这里

#### 把一个元素子元素逆序

```html
<div id="a">
  <span>1</span>
  <p>2</p>
  <a>3</a>
  <div>4</div>
</div>
<script>
  const element = document.getElementById("a");

  /******************普通方式**********************/
  function reverseElement(element) {
    let len = element.childNodes.length;
    while (len--) {
      element.appendChild(element.childNodes[len]);
    }
  }

  /******************Range方式**********************/
  function reverseElement(element) {
    let range = new Range();
    range.selectNodeContents(element);
    let fragment = range.extractContents();

    let len = fragment.childNodes.length;
    while (len--) {
      fragment.appendChild(fragment.childNodes[len]);
    }
    element.appendChild(fragment);
  }
</script>
```

### Web API

![脑图](./images/WebAPI.png)

### 井字棋

![游戏截图](./images/1.png)
