# 每周总结可以写在这里

## 字符串分析与模式匹配

- 字典树(Hash 树的一种)
  - 大量字符串的完整模式匹配
- [KMP(Knuth-Morris-Pratt)](https://zh.wikipedia.org/wiki/%E5%85%8B%E5%8A%AA%E6%96%AF-%E8%8E%AB%E9%87%8C%E6%96%AF-%E6%99%AE%E6%8B%89%E7%89%B9%E7%AE%97%E6%B3%95)
  - 长字符串中找子串 O(m+n)
- WildCard 通配符算法
  - 长字符串中找子串升级版
- 正则
  - 字符串通用模式匹配
- 状态机
  - 通用的字符串分析
- LL LR
  - 字符串多层级结构分析

> KMP 算法

    Knuth-Morris-Pratt 字符串查找算法，简称为 “KMP 算法”，常用于在一个文本串S内查找一个模式串P的出现位置，这个算法由Donald Knuth、Vaughan Pratt、James H. Morris三人于1977年联合发表，故取这三人的姓氏命名此算法。

    算法流程：

    假设现在文本串S匹配到i位置，模式串P匹配到j位置
    如果 j = -1，或者当前字符匹配成功（即 S[i] == P[j]），都令i++，j++，继续匹配下一个字符；
    如果 j != -1，且当前字符匹配失败（即 S[i] != P[j]），则令i不变，j = next[j]。此举意味着失配时，模式串P相对于文本串S向右移动了j - next[j]位。
    换言之，当匹配失败时，模式串向右移动的位数为：失配字符所在位置 - 失配字符对应的next值，即移动的实际位数为：j - next[j]，且此值大于等于1。
    很快，你也会意识到next数组各值的含义：代表当前字符之前的字符串中，有多大长度的相同前缀后缀。例如，如果 next[j] = k，代表j之前的字符串中有最大长度为k的相同前缀后缀。

    此也意味着在某个字符失配时，该字符对应的next值会告诉你下一步匹配中，模式串应该跳到哪个位置（跳到next[j]的位置）。如果next[j]等于0或 -1，则跳到模式串的开头字符，若next[j] = k 且 k > 0，代表下次匹配跳到j之前的某个字符，而不是跳到开头，且具体跳过了k个字符。

```js
// 算法复杂度为O(m+n) 双层for循环
function find(source, pattern) {
  if (!source || !pattern) {
    return false;
  }
  for (let i = 0; i < source.length; i++) {
    let matched = true;
    for (let j = 0; j < pattern.length; j++) {
      if (source[i + j] !== pattern[j]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return true;
    }
  }
  return false;
}
```

```js
function find(source, pattern) {
  let table = new Array(pattern.length).fill(0);
  let k = 0;

  for (let j = 1; j < pattern.length; j++) {
    if (pattern[j] === pattern[k]) {
      k++;
    } else {
      k = 0;
    }
    table[j] = k;
  }

  let j = 0;

  for (let i = 0; i < source.length; i++) {
    console.log(source[i], pattern[j], j);

    if (source[i] === pattern[j]) {
      j++;
    } else {
      j = 0;
      if (source[i] === pattern[j]) {
        j++;
      }
    }

    if (j === pattern.length) {
      return true;
    }
  }
  return false;
}
```

- LR： LR 分析器是一种自底向上（bottom-up）的上下文无关语法分析器。LR 意指由左（Left）至右处理输入字符串，并以最右边优先派生（Right derivation）的推导顺序（相对于 LL 分析器）建构语法树。能以此方式分析的语法称为 LR 语法。而在 LR(k) 这样的名称中，k 代表的是分析时所需前瞻符号（lookahead symbol）的数量，也就是除了目前处理到的输入符号之外，还得再向右引用几个符号之意；省略 （k）时即视为 LR(1)，而非 LR(0)。

* LL： LL 分析器是一种处理某些上下文无关文法的自顶向下分析器。因为它从左（Left）到右处理输入，再对句型执行最左推导出语法树（Left derivation，相对于 LR 分析器）。能以此方法分析的文法称为 LL 文法。
