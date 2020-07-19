export class Timeline {
  constructor() {
    this.animations = [];
    this.requestId = null;
    this.state = "inited";
    this.tick = () => {
      let t = Date.now() - this.startTime;
      let animations = this.animations.filter(
        (animation) => !animation.finished
      );
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
  }

  // tick() {
  //   let t = Date.now() - this.startTime;
  //   let animations = this.animations.filter((animation) => !animation.finished);
  //   for (const animation of animations) {
  //     let {
  //       object,
  //       property,
  //       template,
  //       start,
  //       end,
  //       timingFunction,
  //       delay,
  //       duration,
  //     } = animation;
  //     let progression = timingFunction((t - delay) / duration); // 0-1之间的数
  //     if (t > animation.duration + animation.delay) {
  //       progression = 1;
  //       animation.finished = true;
  //     }
  //     let value = start + progression * (end - start);
  //     object[property] = template(value);
  //   }
  //   if (animations.length) {
  //     requestAnimationFrame(() => this.tick());
  //   }
  // }

  // 暂停
  pause() {
    if (this.state !== "playing") {
      return;
    }
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId);
    }
  }

  // 恢复
  resume() {
    if (this.state !== "paused") {
      return;
    }
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  start() {
    if (this.state !== "inited") {
      return;
    }
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
    }
    this.animations = [];
    this.requestId = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === "playing") {
      animation.addTime =
        addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction;
    // ((start, end) => {
    //   return (t) => start + (t / duration) * (end - start);
    // }) // ease linear easeIn easeOut
  }
}
