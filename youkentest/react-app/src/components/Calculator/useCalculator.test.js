import { act, renderHook } from "@testing-library/react";
import { useCalculator } from "./useCalculator";

describe("useCalculator", () => {
  test("初期状態", () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.state).toMatchObject({
      current: "0",
      previous: null,
      operator: null,
      error: null,
    });
  });

  test("数字入力の連結", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.inputDigit(1));
    act(() => result.current.inputDigit(2));
    expect(result.current.state.current).toBe("12");
  });

  test("演算と結果", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.inputDigit(4));
    act(() => result.current.chooseOperator("+"));
    act(() => result.current.inputDigit(5));
    act(() => result.current.evaluateExpression());
    expect(result.current.state.current).toBe("9");
    expect(result.current.state.previous).toBeNull();
    expect(result.current.state.operator).toBeNull();
  });

  test("連続演算 (5 + 3 * 2 = 16 の簡易処理: 5+3 -> 8, 8*2)", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.inputDigit(5));
    act(() => result.current.chooseOperator("+"));
    act(() => result.current.inputDigit(3));
    act(() => result.current.chooseOperator("*")); // 中間評価 -> previous=8
    act(() => result.current.inputDigit(2));
    act(() => result.current.evaluateExpression());
    expect(result.current.state.current).toBe("16");
  });

  test("ゼロ除算エラー", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.inputDigit(9));
    act(() => result.current.chooseOperator("/"));
    act(() => result.current.inputDigit(0));
    act(() => result.current.evaluateExpression());
    expect(result.current.state.error).toBe("Error");
    expect(result.current.state.current).toBe("0");
  });

  test("C でクリア", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.inputDigit(9));
    act(() => result.current.clearAll());
    expect(result.current.state).toMatchObject({
      current: "0",
      previous: null,
      operator: null,
      error: null,
    });
  });
});
