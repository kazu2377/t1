// test-multiple-operations.js - Test for multiple arithmetic operations functionality

import { processMultipleOperations } from './multipleOperations.js';

console.log('=== Multiple Arithmetic Operations Test ===\n');

// Basic usage example (from requirements)
console.log('【Basic Example】');
const basicExpressions = ["1+2", "10-3", "4*6", "8/2"];
console.log('Input:', basicExpressions);

const basicResults = processMultipleOperations(basicExpressions);
console.log('Output:', basicResults.results);
console.log('Expected: [3, 7, 24, 4]');
console.log('Result:', JSON.stringify(basicResults.results) === JSON.stringify([3, 7, 24, 4]) ? '✓ Success' : '✗ Failed');
console.log('');

// More complex examples
console.log('【Complex Examples】');
const complexExpressions = [
  "15+25",      // 40
  "100-37",     // 63  
  "7*8",        // 56
  "84/12",      // 7
  "-5+10",      // 5
  "3.5*2",      // 7
  "9.6/1.2"     // 8
];
console.log('Input:', complexExpressions);

const complexResults = processMultipleOperations(complexExpressions);
console.log('Output:', complexResults.results);
console.log('');

// Error handling examples
console.log('【Error Handling Examples】');
const mixedExpressions = [
  "5+5",        // 10 (normal)
  "10/0",       // Error: division by zero
  "3*4",        // 12 (normal)
  "abc+def",    // Error: invalid expression
  "15-8"        // 7 (normal)
];
console.log('Input:', mixedExpressions);

const mixedResults = processMultipleOperations(mixedExpressions);
console.log('Output:', mixedResults.results);
console.log('Successful results only:', mixedResults.successfulResults);
console.log('Error details:');
mixedResults.errors.forEach(error => {
  console.log(`  - Expression ${error.index + 1} (${error.expression}): ${error.error}`);
});
console.log('');

console.log('=== Test Completed ===');