const element = document.body;

element.addEventListener("mousedown", () => {
  const move = (event) => {
    console.log(event.clientX, event.clientY);
  };

  const end = (event) => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", end);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", end);
});

element.addEventListener("touchstart", (event) => {
  console.log("touchstart", event.changedTouches[0]);
});

element.addEventListener("touchmove", (event) => {
  console.log("touchmove", event);
});

element.addEventListener("touchend", (event) => {
  console.log("touchend", event);
});

element.addEventListener("touchcancel", (event) => {
  console.log("touchcancel", event);
});


let start = () => {
  
}

let move = () => {

}

let end = () => {

}

let cancel = () => {

}