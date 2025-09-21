import { describe, expect, it } from "vitest";
import { calcFee } from "./calcFee";

describe("calcFee", () => {
  it("子供(5) = 1000", () => {
    console.log("5歳の料金:", calcFee(5));
    expect(calcFee(5)).toBe(1000);
  });

  it("子供 特別チケットで無料", () => {
    expect(calcFee(10, { hasSpecialTicket: true })).toBe(0);
  });

  it("大人(20) = 3000", () => {
    expect(calcFee(20)).toBe(3000);
  });

  it("大人 特別チケットのみ = 2000", () => {
    expect(calcFee(30, { hasSpecialTicket: true })).toBe(2000);
  });

  it("大人 女性の日のみ = 2500", () => {
    expect(calcFee(40, { isWomensDay: true })).toBe(2500);
  });

  it("大人 特別 + 女性の日 = 1500", () => {
    expect(calcFee(40, { hasSpecialTicket: true, isWomensDay: true })).toBe(1500);
  });

  it("境界 17=1000, 18=3000, 74=3000, 75=0", () => {
    expect(calcFee(17)).toBe(1000);
    expect(calcFee(18)).toBe(3000);
    expect(calcFee(74)).toBe(3000);
    expect(calcFee(75)).toBe(0);
  });

  it("75歳以上は割引指定あっても0", () => {
    expect(calcFee(80)).toBe(0);
    expect(calcFee(80, { hasSpecialTicket: true, isWomensDay: true })).toBe(0);
  });

  it("負の年齢は例外", () => {
    expect(() => calcFee(-1)).toThrow();
  });

  it("数値以外は例外", () => {
    // @ts-ignore
    expect(() => calcFee("abc")).toThrow();
  });
});
