var assert = require("assert");
import { parseHTML } from "../src/parser";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

it("parse a single element", function () {
  let doc = parseHTML("<div></div>");
  let element = doc.children[0];
  assert.equal(element.tagName, "div");
  assert.equal(element.children.length, 0);
  assert.equal(element.type, "element");
  assert.equal(element.attributes.length, 2);
});

it("parse a single element with text content", function () {
  let doc = parseHTML("<div>hello</div>");
  let element = doc.children[0].children[0];
  assert.equal(element.content, "hello");
  assert.equal(element.type, "text");
});

it("tag mismatch", function () {
  try {
    let doc = parseHTML("<div></vid>");
  } catch (error) {
    assert.equal(error.message, "Tag start end doesn't match!");
  }
});

it("text with text <", function () {
  let doc = parseHTML("<div>a < b</div>");
  let element = doc.children[0].children[0];
  assert.equal(element.content, "a < b");
  assert.equal(element.type, "text");
});

it("with property", function () {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>");
  let element = doc.children[0];
  let count = 0;

  for (const attr of element.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("with property 2", function () {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
  let element = doc.children[0];
  let count = 0;

  for (const attr of element.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("with property 3", function () {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\" />");
  let element = doc.children[0];
  let count = 0;

  for (const attr of element.attributes) {
    if (attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if (attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if (attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3);
});

it("script", function () {
  const content = `
  <div>abcd</div>
  <span>x</span>
  /script>
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script
  `;
  let doc = parseHTML(`<script>${content}</script>`);
  let element = doc.children[0].children[0];
  assert.equal(element.content, content);
});

it("attribute with no value", function () {
  let doc = parseHTML("<div class />");
  let element = doc.children[0];
  // assert.ok(count === 3);
});
