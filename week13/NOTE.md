# 每周总结可以写在这里

## 组件化基础

### 对象与组件

#### 对象

- Properties
- Methods
- Inherit

#### 组件

- Properties
- Methods
- Inherit
- Attribute
- Config && State
- Event
- Lifecycle
- Children

##### Attribute vs Property

|   名称    |     描述     | 标记语言 | JavaScript |
| :-------: | :----------: | :------: | :--------: |
| Attribute |  强调描述性  |   可以   |    可以    |
| Property  | 强调从属关系 |  不可以  |    可以    |

```js

// Attribute:
 <my-component attribute=“v” /> myComponent.getAttribute(“a”) myComponent.setAttribute(“a”,“value”);

// Property:
myComponent.a = “value”;
```
