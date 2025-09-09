// multipleOperations.js - 複数の四則演算機能

import { add, sub, mul, div } from './arithmetic.js';

/**
 * 式文字列を解析して計算結果を返す
 * @param {string} expression - 計算式（例: "1+2", "10-3", "4*6", "8/2"）
 * @returns {number} 計算結果
 * @throws {Error} 不正な式の場合
 */
export function evaluateExpression(expression) {
  if (typeof expression !== 'string') {
    throw new Error('式は文字列である必要があります');
  }

  // 空白を除去
  const cleanExpression = expression.replace(/\s+/g, '');
  
  // 式の検証（数字と演算子のみを許可）
  if (!/^-?\d+(\.\d+)?[+\-*/]-?\d+(\.\d+)?$/.test(cleanExpression)) {
    throw new Error(`不正な式です: ${expression}`);
  }

  // 演算子を検索
  let operator = '';
  let operatorIndex = -1;
  
  // 最初の文字が負号の場合は2文字目から検索開始
  const startIndex = cleanExpression.startsWith('-') ? 1 : 0;
  
  for (let i = startIndex; i < cleanExpression.length; i++) {
    if (['+', '-', '*', '/'].includes(cleanExpression[i])) {
      operator = cleanExpression[i];
      operatorIndex = i;
      break;
    }
  }

  if (operatorIndex === -1) {
    throw new Error(`演算子が見つかりません: ${expression}`);
  }

  const leftStr = cleanExpression.substring(0, operatorIndex);
  const rightStr = cleanExpression.substring(operatorIndex + 1);

  const left = parseFloat(leftStr);
  const right = parseFloat(rightStr);

  if (isNaN(left) || isNaN(right)) {
    throw new Error(`数値の解析に失敗しました: ${expression}`);
  }

  // 対応する関数を呼び出し
  let result;
  switch (operator) {
    case '+':
      result = add(left, right);
      break;
    case '-':
      result = sub(left, right);
      break;
    case '*':
      result = mul(left, right);
      break;
    case '/':
      result = div(left, right);
      break;
    default:
      throw new Error(`サポートされていない演算子です: ${operator}`);
  }
  
  // 浮動小数点の精度問題を軽減（12桁で丸め）
  return Math.round(result * 1e12) / 1e12;
}

/**
 * 複数の計算式を一括処理する
 * @param {string[]} expressions - 計算式の配列
 * @returns {Array<number|Error>} 計算結果の配列（エラーの場合はErrorオブジェクト）
 */
export function evaluateMultipleExpressions(expressions) {
  if (!Array.isArray(expressions)) {
    throw new Error('入力は配列である必要があります');
  }

  return expressions.map((expression, index) => {
    try {
      return evaluateExpression(expression);
    } catch (error) {
      return new Error(`式 ${index + 1} (${expression}): ${error.message}`);
    }
  });
}

/**
 * 複数の計算式を処理し、結果を分かりやすい形式で返す
 * @param {string[]} expressions - 計算式の配列
 * @returns {Object} 処理結果
 */
export function processMultipleOperations(expressions) {
  if (!Array.isArray(expressions)) {
    throw new Error('入力は配列である必要があります');
  }

  const results = [];
  const errors = [];
  const successfulResults = [];

  expressions.forEach((expression, index) => {
    try {
      const result = evaluateExpression(expression);
      results.push(result);
      successfulResults.push(result);
    } catch (error) {
      const errorInfo = {
        index: index,
        expression: expression,
        error: error.message
      };
      results.push(null);
      errors.push(errorInfo);
    }
  });

  return {
    results: results,               // すべての結果（エラーの場合はnull）
    successfulResults: successfulResults,  // 成功した結果のみ
    errors: errors,                 // エラー情報
    hasErrors: errors.length > 0    // エラーがあるかどうか
  };
}