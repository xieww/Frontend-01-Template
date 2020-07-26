import { createElement, Text, Wrapper } from "./util";
import { TimeLine, Animation } from "./animation";
import { ease } from "./cubicBezier";
import { enableGesture } from "./gesture";

export class Carousel {
  constructor(config) {
    this.children = [];
    this.attribute = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    const children = this.data.map((url) => (
      <img src={url} draggable="false" />
    ));
    const root = <div class="carousel">{children}</div>;

    let position = 0;
    let timeline = new TimeLine();
    timeline.start();

    let nextPic = () => {
      const nextPosition = (position + 1) % this.data.length;
      const current = children[position];
      const next = children[nextPosition];

      const currentAnimation = new Animation(
        current.style,
        "transform",
        (v) => `translate(${v}%)`,
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease
      );
      const nextAnimation = new Animation(
        next.style,
        "transform",
        (v) => `translate(${v}%)`,
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease
      );

      timeline.add(currentAnimation);
      timeline.add(nextAnimation);

      position = nextPosition;

      setTimeout(nextPic, 3000);
    };
    setTimeout(nextPic, 3000);

    root.addEventListener("mousedown", (event) => {
      let startX = event.clientX;
      const nextPosition = (position + 1) % this.data.length;
      const lastPosition = (position - 1 + this.data.length) % this.data.length;

      const current = children[position];
      const next = children[nextPosition];
      const last = children[lastPosition];

      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";
      last.style.transition = "ease 0s";

      current.style.transform = `translateX(${-500 * position}px)`;
      next.style.transform = `translateX(${-500 - 500 * nextPosition}px)`;
      last.style.transform = `translateX(${500 - 500 * lastPosition}px)`;

      let move = (event) => {
        current.style.transform = `translateX(${
          event.clientX - startX - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          event.clientX - startX + 500 - 500 * nextPosition
        }px)`;
        last.style.transform = `translateX(${
          event.clientX - startX - 500 - 500 * lastPosition
        }px)`;
      };
      let up = (event) => {
        let offset = 0;
        if (event.clientX - startX > 250) {
          offset = 1; // 往右拖动
        } else if (event.clientX - startX < -250) {
          offset = -1; // 往左拖动
        }

        current.style.transition = "";
        next.style.transition = "";
        last.style.transition = "";

        current.style.transform = `translateX(${
          offset * 500 - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;
        last.style.transform = `translateX(${
          offset * 500 - 500 - 500 * lastPosition
        }px)`;

        position = (position - offset + this.data.length) % this.data.length;
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
