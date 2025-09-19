import { useState } from 'react';

// シンプル電卓ロジックフック
export function useCalculator() {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState(null); // string | null
  const [operator, setOperator] = useState(null); // '+', '-', '*', '/'
  const [error, setError] = useState(null);

  function clearAll() {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
    setError(null);
  }

  function inputDigit(d) {
    if (error) setError(null);
    setCurrent(cur => {
      if (cur === '0') return String(d);
      return cur + d;
    });
  }

  function chooseOperator(op) {
    if (error) return;
    // 既にオペレータがあり current 入力中なら途中評価（連続演算簡易対応）
    if (operator && previous != null) {
      const interim = evaluate(previous, current, operator);
      if (interim === 'Error') {
        setError('Error');
        setCurrent('0');
        setPrevious(null);
        setOperator(null);
        return;
      }
      setPrevious(interim);
      setCurrent('0');
      setOperator(op);
      return;
    }
    setPrevious(current);
    setCurrent('0');
    setOperator(op);
  }

  function evaluateExpression() {
    if (error) return;
    if (previous == null || !operator) return; // 何もすることがない
    const result = evaluate(previous, current, operator);
    if (result === 'Error') {
      setError('Error');
      setCurrent('0');
      setPrevious(null);
      setOperator(null);
      return;
    }
    setCurrent(result);
    setPrevious(null);
    setOperator(null);
  }

  function evaluate(aStr, bStr, op) {
    const a = Number(aStr);
    const b = Number(bStr);
    if (op === '/' && b === 0) return 'Error';
    switch (op) {
      case '+': return String(a + b);
      case '-': return String(a - b);
      case '*': return String(a * b);
      case '/': return String(a / b);
      default: return bStr;
    }
  }

  return {
    state: { current, previous, operator, error },
    inputDigit,
    chooseOperator,
    evaluateExpression,
    clearAll
  };
}
