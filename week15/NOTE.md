# 组件化--动画

```js
this.tick = () => {
  let t = Date.now() - this.startTime;
  let animations = this.animations.filter((animation) => !animation.finished);
  for (const animation of animations) {
    let {
      object,
      property,
      template,
      start,
      end,
      timingFunction,
      delay,
      duration,
      addTime,
    } = animation;
    let progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数
    if (t > duration + delay + addTime) {
      progression = 1;
      animation.finished = true;
    }
    let value = start + progression * (end - start);
    object[property] = template(value);
  }
  if (animations.length) {
    this.requestId = requestAnimationFrame(this.tick);
  }
};
```
