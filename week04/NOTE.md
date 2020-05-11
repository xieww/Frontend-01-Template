# 每周总结可以写在这里

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
