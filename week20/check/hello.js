// console.log('Hello, world!');
// phantom.exit();

var page = require("webpage").create();
page.open("http://localhost:8000/", function (status) {
  console.log("Status: " + status);
  if (status === "success") {
    // page.render('./taobao.png');

    var body = page.evaluate(function () {
      var toString = function (pad, element) {
        console.log("element", elements);
        var children = element.children;
        var childrenString = "";
        for (let i = 0; i < element.children.length; i++) {
          childrenString += toString("    " + pad, element.children[i] + "\n");
        }
        return (
          pad + element.tagName + (childrenString ? "\n" + childrenString : "")
        );
      };
      return toString("", document.body);
    });
    console.log(body);
  }
  phantom.exit();
});
