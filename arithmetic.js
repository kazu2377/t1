// arithmetic.js - Clean arithmetic functions module

/** @throws {TypeError} When non-numeric value is passed */
function _assertNumber(n, name = "value") {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    throw new TypeError(`${name} must be a finite number (received: ${n}).`);
  }
}

/** Addition */
export function add(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  return a + b;
}

/** Subtraction */
export function sub(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  return a - b;
}

/** Multiplication */
export function mul(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  return a * b;
}

/** Division (prevents division by zero) */
export function div(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  if (b === 0) throw new RangeError("Cannot divide by zero.");
  return a / b;
}

/** Modulo (mod) */
export function mod(a, b) {
  _assertNumber(a, "a");
  _assertNumber(b, "b");
  if (b === 0) throw new RangeError("Cannot divide by zero.");
  return a % b;
}