export function calcFee(age, { hasSpecialTicket = false, isWomensDay = false } = {}) {
  if (!Number.isFinite(age)) throw new Error("年齢が数値ではありません");
  if (age < 0) throw new Error("年齢が不正です");

  let base;
  if (age >= 75) base = 0;
  else if (age >= 18) base = 3000;
  else base = 1000;

  if (base === 0) return 0;

  let fee = base;

  if (hasSpecialTicket) {
    fee -= 1000;
  }
  if (fee > 0 && isWomensDay) {
    fee -= 500;
  }
  return fee;
}
