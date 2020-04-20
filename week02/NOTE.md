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