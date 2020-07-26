export function enableGesture(element) {
  let contexts = Object.create(null);
  let MOUSE_SYMBOL = Symbol("mouse");

  if (document.ontouchstart !== null) {
    element.addEventListener("mousedown", (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);

      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };

      let mouseend = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseend);
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseend);
    });
  }

  element.addEventListener("touchstart", (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener("touchmove", (event) => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  element.addEventListener("touchcancel", (event) => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  let start = (point, context) => {
    element.dispatchEvent(
      new CustomEvent("start", {
        startX: point.clinetX,
        startY: point.clinetY,
        clinetX: point.clinetX,
        clinetY: point.clinetY,
      })
    );
    context.startX = point.clinetX;
    context.startY = point.clinetY;
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timoutHandler = setTimeout(() => {
      if (context.isPan) {
        return;
      }

      context.isTap = false;
      context.isPan = false;
      context.isPress = true;

      element.dispatchEvent(new CustomEvent("pressstart", {}));
    }, 500);
    console.log("start", context, point, point.clinetX);
  };

  let move = (point, context) => {
    const dx = point.clinetX - context.startX;
    const dy = point.clinetY - context.startY;

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent("presscancel", {}));
      }

      context.isTap = false;
      context.isPan = true;
      context.isPress = true;

      element.dispatchEvent(
        new CustomEvent("panstart", {
          startX: context.startX,
          startY: context.startY,
          clinetX: point.clinetX,
          clinetY: point.clinetY,
        })
      );
    }

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });

      context.moves = context.moves.filter(
        (record) => Date.now() - record.t < 300
      );
      let e = new CustomEvent("pan");
      Object.assign(e, {
        startX: context.startX,
        startY: context.startY,
        clinetX: point.clinetX,
        clinetY: point.clinetY,
      });
      event.dispatchEvent(e);
    }
    console.log("move", dx, dy, context);
  };

  let end = (point, context) => {
    if (context.isPan) {
      let dx = point.clinetX - context.startX;
      let dy = point.clinetY - context.startY;
      let record = context.moves[0];
      let speed =
        Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) /
        (Date.now() - record.t);

      let isFlick = speed > 2.5;

      if (isFlick) {
        element.dispatchEvent(
          new CustomEvent("flick", {
            startX: context.startX,
            startY: context.startY,
            clinetX: point.clinetX,
            clinetY: point.clinetY,
            speed,
          })
        );
      }

      element.dispatchEvent(
        Object.assign(new CustomEvent("panend"), {
          startX: context.startX,
          startY: context.startY,
          clinetX: point.clinetX,
          clinetY: point.clinetY,
          speed,
          isFlick,
        })
      );
    }

    if (context.isTap) {
      element.dispatchEvent(new CustomEvent("tap", {}));
    }

    if (context.isPress) {
      element.dispatchEvent(new CustomEvent("pressend"), {});
    }

    clearTimeout(context.timoutHandler);
  };

  // xuminle520
  let cancel = (point, context) => {
    element.dispatchEvent(new CustomEvent("canceled"), {});
    clearTimeout(context.timoutHandler);
  };
}
