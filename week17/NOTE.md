# 组件化和工具链

## 工具链

### yeoman

#### 使用

```bash
npm install -g yo
```

#### 初始化

```js
{
  "name": "generator-name",
  "version": "0.1.0",
  "description": "",
  "files": [
    "generators"
  ],
  "keywords": ["yeoman-generator"],
  "dependencies": {
    "yeoman-generator": "^1.0.0"
  },
   "files": [
    "app",
    "router"
  ]
}
```

#### 项目结构

```js
├───package.json
└───generators/
    ├───app/
    │   └───index.js
    └───router/
        └───index.js
```

#### 建立软链接

>

  这将安装您的项目依赖项，并将全局模块符号链接到本地​​文件

```bash
npm link
```


```js
async function select(choices) {
  let selected = 0;
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    if (i === selected) {
      stdout.write("[x] " + choice + "\n");
    } else {
      stdout.write("[ ] " + choice + "\n");
    }
  }

  up(choices.length);
  right();
  while (true) {
    let char = await getChar();
    if (char === "\u0003") {
      process.exit();
      break;
    }
    if (char === "w" && selected > 0) {
      stdout.write(" ");
      left();
      selected--;
      up();
      stdout.write("x");
      left();
    }
    if (char === "s" && selected < choices.length - 1) {
      stdout.write(" ");
      left();
      selected++;
      down();
      stdout.write("x");
      left();
    }
    if (char === "\r") {
      down(choices.length - selected);
      left();
      return choices[selected];
    }
  }
}
```
