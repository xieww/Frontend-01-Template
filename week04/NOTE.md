# 每周总结可以写在这里

[Realm Object可视化](https://codesandbox.io/s/little-lake-31s9r?file=/index.html)

>宏任务
        1、脚本，渲染事件（如解析DOM，计算布局，布局）
        2、mousemove等UI事件，用户互动事件（如鼠标点击，滚动页面，放大缩小等）
        3、setTimeout / setInterval当JS引擎忙于执行宏任务时，宏任务就会形成一个
        副本，直到上一个宏任务执行完成，才会继续执行宏任务标题中的任务。例如，当
        JS、引擎忙于执行外部脚本脚本时，此时界面触发了鼠标移动事件，然后又触发了计
        时器，这时候，鼠标移动事件和计时器会形成宏任务变量，等待执行。
        4、JavaScript脚本执行事件；网络请求完成，文件读写完成事件。为了协调这些任务有条不扭曲地在主线程上执行，页面进程重新启动消息事件和事件循环机制，渲染内部会维护多个消息变量，而不连续进行。然后将主线程采用一个进行循环，不断地从这些任务中取任务并执行任务。我们把这些消息本身的任务称为宏任务。

<font color=#e83e8c>script</font>
<font color=#e83e8c>setTimeout</font>
<font color=#e83e8c>setInterval</font>
<font color=#e83e8c>setImmediate</font>
<font color=#e83e8c>I/O</font>
<font color=#e83e8c></font>

>微任务

        微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后，当前宏任
        务结束之前。
        1、微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务副本
        2、一些一个宏任务在执行过程中，产生了100个微任务，执行每个微任务的时间是10
           毫秒，那么执行这100个微任务的时间。就是1000毫秒，也可以说这100个微任务
           让宏任务的执行时间延长了1000毫秒。所以你在写代码的时候一定要注意控制微
           任务的执行时长。
        3、在一个宏任务中，分别创建一个用于替代的宏任务和微任务，无论什么情况下，
           微任务都早于宏任务执行
<font color=#e83e8c>process.nextTick</font>
<font color=#e83e8c>process</font>
<font color=#e83e8c>Object.observe</font>
<font color=#e83e8c>MutationObserver</font>

```js
async function afoo() {
    console.log("-2")
    await afoo2()
    console.log("-1")
}
async function afoo2(){

}
new Promise(resolve=>{
    console.log("0");
    resolve()
}).then(()=>{
    console.log("1")
    new Promise(resolve => resolve())
        .then(() => console.log("1.5"))
    }
)
setTimeout(function () {
    console.log("2");
    new Promise(resolve => resolve()).then(console.log("3"))
}, 0)
console.log("4");
afoo()
// 运行结果1： chrome
// 宏任务
// 0  4  -2 (异步开始入队 promise优先await  所以输出1 -1)
// 1 （异步再次入队，1.5后于-1输出
// -1
// 1.5

// 宏任务
// 2
// 3
// 运行结果2： sarfir
// 0 4 -2 1 1.5 -1 2 3
// 例题
async function afoo() {
    console.log("-2")
    await new Promise(resolve => resolve());
    console.log("-1")
}
new Promise(resolve => (console.log("0"), resolve()))
    .then(() => (
        console.log("1"),
        new Promise(resolve => resolve())
            .then(() => console.log("1.5"))
        )
    );
setTimeout(function () {
    console.log("2");
    new Promise(resolve => resolve()).then(console.log("3"))
}, 0)
console.log("4");
afoo()
// 运行结果与上题一样
// 例题
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

// chrome script start script end promise1 promise2 setTimeout

// 头条面试题
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
// chrome script start  async1 start   async2  promise1  script end   promise2  async1 end  setTimeout
// sarfir script start  async1 start   async2  promise1  script end   async1 end  promise2  setTimeout


// new Promise(resolve=>resolve())
//     .then(()=>setTimeout(()=>console.log(1),1000),console.log(0))
// console.log(2)

// david
function sleep(duration) {
    return new Promise(function (resolve, reject) {
        console.log("b");
        // setTimeout(function () {
            resolve();
            var begin = Date.now();
            while (Date.now() - begin < 1000);
            console.log("d");
        // }, duration);
    })
}
console.log("a");
sleep(0).then(() => console.log("c"));
// a b d c

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
// async1 start
// async2
// promise1

// async1 end
// promise2
```
