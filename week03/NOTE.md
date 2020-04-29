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
方法：

[[DefineOwnProperty]]

设置对象的length属性，根据length的变化对对象进行操作

newLength > length 用空扩充数组

newLength < length 截取数组

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

  本周主要讲解了表达式、类型转换、语句、对象。上了三周的课，前面两周讲的东西听完之后基本上就是一脸懵逼，感觉和自己平常工作中接触的东西根本不沾边，有些也只是听得一知半解。本周开始讲的基本上都听得懂，但是还是需要慢慢消化。对于表达式平常工作中用的最多的就是for(;;)循环，其他两种用的并不是很多，JavaScript中ECMA-262第三版中引入try{}catch{}，而其用于捕获异常，接触到的语言中Java用的最多。Java中的异常分为运行时异常和非运行时异常，运行时异常可以选择捕获处理或者不处理，而非运行时异常是需要进行捕获处理的，这时候就需要用到try{}catch{}来进行处理。try{}catch{}最适合处理那些我们无法控制的错误，如I/O操作等，后端nodeJs或java读取I/O操作比较多比如读数据库，所以用try{}catch{}比较多。前端可以用在上传图片、使用别人的js库报错、async await同步调接口等地方适用，而对于JavaScript平常工作中基本上是不用的，或许是处于性能考虑，有些低版本浏览器很消耗性能，所以建议慎用try{}catch{}。

```js
错误类型：
Error，
EvalError，
RangeError，
ReferenceError，
SyntaxError，
TypeError，
URIError

其中Error是基类型，其他错误类型都继承自该类型，因此所有错误类型共享一组相同的属性
```

表达式

```js
+ -
* /
()
a++
a--
++a
--a
+a
-a
~a
!a
<< >> >>>
> < >= <=
==
!=
===
!==
& ^ |
&& || ?:
```

语句

```js
while(){}

do {} while()

for(;;){}

for( in ){}

for( of ){}

try{

} catch {

} finally {

}
```

声明

```js
var

es6新增
const 定义常量
let

function

function*

async function

async function*

class

```
