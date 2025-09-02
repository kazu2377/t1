//コメント: この関数は2つの数値を加算し、それらが両方とも数値であることを確認する。
/**
 * 2つの数値を加算し、結果を返します。
 * @param {number} a - 1つ目の数値
 * @param {number} b - 2つ目の数値
 * @returns {number} 加算結果
 */
function ensureNumber(value) {
  if (typeof value !== "number") {
    throw new TypeError("Argument must be a number");
  }
}

function add(a, b) {
  ensureNumber(a);
  ensureNumber(b);
  return a + b;
}

//security上問題のある関数
function unsafeAdd(a, b) {
  return a + b;
}
