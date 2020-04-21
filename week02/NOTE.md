# 每周总结

  **本周主要从编程语言通识和JavaScript词法和类型两个方面进行讲解**  

  **编程语言通识**
  * 一般命令式编程语言；
  * 类型系统；
  * 动态和静态；
  * 语言的语法分类；
  * 语言产生式(BNF)；
  * 图灵完备性
  
　　上周两节课听下来虽然学到看到一些以前从未接触到的知识，也更加让自己意识的自己有很多不足和欠缺。对Unicode编码，JavaScript词法和类型了解的并没有那么深，比如JavaScript中的类型系统,以前也就是知道有七种基本类型，就算是工作使用也只是用其中的几种，更不会深究其内部原理。几节课听下来感觉自己不会的是越来越多😂，我都怀疑自己可能是个假前端。也可能是老师讲的话题太高端，自己又太菜了，跟不上趟。不知道下次老师会讲什么，希望别太深奥。
  
  
  


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

// 双引号
/\"/

//单引号
/\'/

/(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E])[\u0021-\u007E]{6,16}$)|(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x21-\x7E]{6,16}$)|((?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*)/

```
