// example-usage.js - Usage examples for multiple arithmetic operations functionality

import { processMultipleOperations, evaluateExpression } from './multipleOperations.js';

console.log('=== Multiple Arithmetic Operations Usage Examples ===\n');

// Single expression calculation
console.log('【Single Expression Calculation】');
try {
  console.log('5 + 3 =', evaluateExpression('5+3'));
  console.log('12 / 4 =', evaluateExpression('12/4'));
} catch (error) {
  console.error('Error:', error.message);
}
console.log('');

// Multiple expression batch calculation (recommended usage)
console.log('【Multiple Expression Batch Calculation】');
const expressions = ['1+2', '10-3', '4*6', '8/2'];
const result = processMultipleOperations(expressions);

console.log('Input:', expressions);
console.log('Result:', result.results);

if (result.hasErrors) {
  console.log('Errors occurred:');
  result.errors.forEach(error => {
    console.log(`  ${error.expression}: ${error.error}`);
  });
} else {
  console.log('All calculations completed successfully!');
}
console.log('');

// Practical example
console.log('【Practical Example - Product Price Calculation】');
const priceCalculations = [
  '100*1.1',    // Product A: 100 yen + 10% tax
  '250*0.8',    // Product B: 250 yen with 20% discount  
  '500+50',     // Product C: 500 yen + 50 yen shipping
  '1000/2'      // Product D: 1000 yen split between 2 people
];

const priceResults = processMultipleOperations(priceCalculations);
console.log('Price calculations:');
priceCalculations.forEach((expression, index) => {
  const result = priceResults.results[index];
  if (result !== null) {
    console.log(`  ${expression} = ${result} yen`);
  } else {
    const error = priceResults.errors.find(e => e.index === index);
    console.log(`  ${expression} = Error: ${error.error}`);
  }
});

console.log('\n=== Usage Examples End ===');