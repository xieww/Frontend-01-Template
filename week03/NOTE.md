# 每周总结可以写在这里

## JavaScript中普通对象(Ordinary Object Internal Methods and Internal Slots)
```js
方法
[[GetPrototypeOf]]
[[SetPrototypeOf]]
[[IsExtensible]]
[[PreventExtensions]]
[[GetOwnProperty]]
[[DefineOwnProperty]]
[[HasProperty]]
[[Get]]
[[Set]]
[[Delete]]
[[OwnPropertyKeys]]
```

## JavaScript中的特殊对象

- ECMAScript Function Objects

```js
内部槽：

[[Environment]] 函数定义地方的词法环境
[[FormalParameters]]
[[FunctionKind]] 函数类型
[[ECMAScriptCode]]
[[ConstructorKind]]
[[Realm]]
[[ScriptOrModule]]
[[ThisMode]] 如何解析this
[[Strict]] 严格模式
[[HomeObject]] 对这个属性值使用 GetPrototypeOf 来获取 super
[[SourceText]]

方法：
[[Call]]
[[Construct]]

```

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

```js
内部槽：

[[StringData]]
```

- Arguments Exotic Objects 参数对象

```js
内部槽：

[[ParameterMap]]

```

- Integer-Indexed Exotic Objects

```js
特殊槽：

[[ViewedArrayBuffer]]
[[ArrayLength]]
[[ByteOffset]]
[[TypedArrayName]]
```

- Module Namespace Exotic Objects

```js
[[Module]]   Module Record   模块记录其导出的名称空间。
[[Exports]]  List of String   包含作为该对象的自身属性公开的导出名称的字符串值的列表。该列表的排序方式与使用Array.prototype对这些字符串值的数组排序一样。使用undefined作为comparefn排序
[[Prototype]] null   这个槽总是包含空值
```

- Immutable Prototype Exotic Objects

```js
内部槽：

[[Prototype]]
```

- Proxy Object Internal Methods and Internal Slots

```js
内部槽：

[[ProxyHandler]]

```
