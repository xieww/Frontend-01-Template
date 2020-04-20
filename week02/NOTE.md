# 每周总结

### UTF-8 Encoding

```js
 function UTF8_Encoding(str) {
    if(!str) {
      return;
    }
    const encode = encodeURIComponent(str);
    const len = encode.length
    const arr = [];
    for (let i = 0; i < len; i+=1) {
      const ct = encode.charAt(i);
      if (ct === '%') {
        const ec = encode.charAt(i + 1) + encode.charAt(i + 2);
        const ecVal = parseInt(hex, 16);
        arr.push(ecVal);
        i += 2;
      } else {
        arr.push(ct.charCodeAt(0))
      };
    }
    return arr;
  }
```

### 匹配所有 Number 直接量
```js
// 数字正则
/^-?\d*\.?\d+$/

// 二进制
/^[01]+$/

// 八进制
/^[0-7]+$/

// 十六进制
/(^0[xX][a-fA-F0-9]{1,2}$)|(^[a-fA-F0-9]{1,2}$)/

// 综合
/(^-?\d*\.?\d+$)|(^[01]+$)|(^[0-7]+$)|((^0[xX][a-fA-F0-9]{1,2}$)|(^[a-fA-F0-9]{1,2}$))/
```

### 匹配所有的字符串直接量，单引号和双引号

```js

```