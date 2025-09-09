# Multiple Arithmetic Operations

A functionality to execute multiple arithmetic operations (addition, subtraction, multiplication, division) in batch.

## Feature Overview

- Receives multiple arithmetic expressions as an array and returns each result
- Handles errors such as invalid expressions and division by zero
- Returns results in an easy-to-understand format

## Usage

### Basic Usage Example

```javascript
import { processMultipleOperations } from './multipleOperations.js';

const expressions = ["1+2", "10-3", "4*6", "8/2"];
const result = processMultipleOperations(expressions);

console.log('Input:', expressions);
console.log('Output:', result.results);
// Output: [3, 7, 24, 4]
```

### Single Expression Calculation

```javascript
import { evaluateExpression } from './multipleOperations.js';

const result = evaluateExpression("5+3");
console.log(result); // 8
```

## Supported Operations

- **Addition** (`+`): `"1+2"` → `3`
- **Subtraction** (`-`): `"10-3"` → `7`
- **Multiplication** (`*`): `"4*6"` → `24`
- **Division** (`/`): `"8/2"` → `4`

## Supported Input Formats

- Integers: `"5+3"`
- Decimals: `"3.5*2"`
- Negative numbers: `"-5+10"`, `"10+-3"`
- Expressions with spaces: `" 1 + 2 "`

## Error Handling

### Division by Zero

```javascript
processMultipleOperations(["5/0"]);
// Result: { results: [null], errors: [...], hasErrors: true }
```

### Invalid Expressions

```javascript
processMultipleOperations(["abc+def"]);
// Result: { results: [null], errors: [...], hasErrors: true }
```

### Mixed Valid and Invalid Expressions

```javascript
const expressions = ["1+2", "5/0", "3*4"];
const result = processMultipleOperations(expressions);

console.log(result.results);           // [3, null, 12]
console.log(result.successfulResults); // [3, 12]
console.log(result.hasErrors);         // true
console.log(result.errors);            // Error details
```

## Return Value Format

Return value of `processMultipleOperations()`:

```javascript
{
  results: Array<number|null>,          // All results (null for errors)
  successfulResults: Array<number>,     // Successful results only
  errors: Array<{                       // Error information
    index: number,                      // Index of expression where error occurred
    expression: string,                 // Expression where error occurred
    error: string                       // Error message
  }>,
  hasErrors: boolean                    // Whether there are errors
}
```

## File Structure

- `arithmetic.js` - Basic arithmetic operation functions
- `multipleOperations.js` - Multiple operation processing functionality
- `test-multiple-operations.js` - Test file
- `example-usage.js` - Usage examples

## Execution

```bash
# Run tests
node test-multiple-operations.js

# Run usage examples
node example-usage.js
```