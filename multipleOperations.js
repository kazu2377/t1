// multipleOperations.js - Multiple arithmetic operations functionality

import { add, sub, mul, div } from './arithmetic.js';

/**
 * Parse expression string and return calculation result
 * @param {string} expression - Mathematical expression (e.g., "1+2", "10-3", "4*6", "8/2")
 * @returns {number} Calculation result
 * @throws {Error} When expression is invalid
 */
export function evaluateExpression(expression) {
  if (typeof expression !== 'string') {
    throw new Error('Expression must be a string');
  }

  // Remove whitespace
  const cleanExpression = expression.replace(/\s+/g, '');
  
  // Validate expression (allow only numbers and operators)
  if (!/^-?\d+(\.\d+)?[+\-*/]-?\d+(\.\d+)?$/.test(cleanExpression)) {
    throw new Error(`Invalid expression: ${expression}`);
  }

  // Find operator
  let operator = '';
  let operatorIndex = -1;
  
  // If first character is negative sign, start search from second character
  const startIndex = cleanExpression.startsWith('-') ? 1 : 0;
  
  for (let i = startIndex; i < cleanExpression.length; i++) {
    if (['+', '-', '*', '/'].includes(cleanExpression[i])) {
      operator = cleanExpression[i];
      operatorIndex = i;
      break;
    }
  }

  if (operatorIndex === -1) {
    throw new Error(`Operator not found: ${expression}`);
  }

  const leftStr = cleanExpression.substring(0, operatorIndex);
  const rightStr = cleanExpression.substring(operatorIndex + 1);

  const left = parseFloat(leftStr);
  const right = parseFloat(rightStr);

  if (isNaN(left) || isNaN(right)) {
    throw new Error(`Failed to parse numbers: ${expression}`);
  }

  // Call corresponding function
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
      throw new Error(`Unsupported operator: ${operator}`);
  }
  
  // Reduce floating point precision issues (round to 12 digits)
  return Math.round(result * 1e12) / 1e12;
}

/**
 * Process multiple mathematical expressions in batch
 * @param {string[]} expressions - Array of mathematical expressions
 * @returns {Array<number|Error>} Array of calculation results (Error object for errors)
 */
export function evaluateMultipleExpressions(expressions) {
  if (!Array.isArray(expressions)) {
    throw new Error('Input must be an array');
  }

  return expressions.map((expression, index) => {
    try {
      return evaluateExpression(expression);
    } catch (error) {
      return new Error(`Expression ${index + 1} (${expression}): ${error.message}`);
    }
  });
}

/**
 * Process multiple mathematical expressions and return results in user-friendly format
 * @param {string[]} expressions - Array of mathematical expressions
 * @returns {Object} Processing results
 */
export function processMultipleOperations(expressions) {
  if (!Array.isArray(expressions)) {
    throw new Error('Input must be an array');
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
    results: results,               // All results (null for errors)
    successfulResults: successfulResults,  // Successful results only
    errors: errors,                 // Error information
    hasErrors: errors.length > 0    // Whether there are errors
  };
}