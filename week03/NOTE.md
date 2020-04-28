# 每周总结可以写在这里

## JavaScript 中的特殊对象

- Bound Function Exotic Objects

```js
绑定函数是包装另一个函数对象的外来对象。绑定函数是可调用的(它有一个[[Call]]内部方法，可以有一个[[Construct]]内部方法)。调用绑定函数通常会导致调用其包装函数。

[[BoundTargetFunction]] 被 bind 的函数
[[BoundThis]] bind 时候的 this 参数
[[BoundArguments]] bind 时候的其他参数

```

- Array Exotic Objects 数组对象

```js
```

- String Exotic Objects 字符串对象

- Arguments Exotic Objects 参数对象

- Integer-Indexed Exotic Objects

- Module Namespace Exotic Objects

- Module Namespace Exotic Objects

```js
[[Module]]   Module Record   模块记录其导出的名称空间。
[[Exports]]  List of String   包含作为该对象的自身属性公开的导出名称的字符串值的列表。该列表的排序方式与使用Array.prototype对这些字符串值的数组排序一样。使用undefined作为comparefn排序
[[Prototype]] null   这个槽总是包含空值
```

- Immutable Prototype Exotic Objects

- Proxy Object Internal Methods and Internal Slots
