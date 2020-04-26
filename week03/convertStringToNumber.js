function convertStringToNumber(str, hex) {
  if (arguments.length < 2) {
    hex = 10;
  }
  const arr = str.split('');
  var num = 0;
  let i = 0;

  while (i < arr.length && arr[i] !== '.') {
    const element = arr[i];
    num = num * hex;
    num += element.codePointAt(0) - '0'.codePointAt(0);
    i++;
  }

  if (arr[i] === '.') {
    i++;
  }

  let decimal = 1;
  while (i < arr.length) {
    const element = arr[i];
    decimal = decimal / hex;
    num += (element.codePointAt(0) - '0'.codePointAt(0)) * decimal;
    i++;
  }

  return num;
}
console.log(convertStringToNumber("10.0123"));

function convertNumberToString(num, hex) {
  if (arguments.length < 2) {
    hex = 10;
  }

  if (num === 0) {
    str = num + ''; // 或者 `${num}`
    return str;
  }
  var integer = Math.floor(num);// 整数部分
  var decimal = num - integer;// 小数部分
  console.log('decimal', decimal);

  var str = '';
  while (integer > 0) {
    str = String(integer % hex) + str;
    integer = Math.floor(integer / hex);
  }
  return str;
}
console.log(convertNumberToString(0));