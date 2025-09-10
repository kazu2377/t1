# 複数の四則演算処理

複数の四則演算（足し算、引き算、掛け算、割り算）を一括で実行する機能です。

## 機能概要

- 複数の数式を配列で受け取り、それぞれの計算結果を返します
- 不正な式や0除算などのエラーを適切に処理します
- 分かりやすい形式で結果を返します

## 使用方法

### 基本的な使用例

```javascript
import { processMultipleOperations } from './multipleOperations.js';

const expressions = ["1+2", "10-3", "4*6", "8/2"];
const result = processMultipleOperations(expressions);

console.log('入力:', expressions);
console.log('出力:', result.results);
// 出力: [3, 7, 24, 4]
```

### 単一式の計算

```javascript
import { evaluateExpression } from './multipleOperations.js';

const result = evaluateExpression("5+3");
console.log(result); // 8
```

## サポートされている演算

- **Addition** (`+`): `"1+2"` → `3`
- **引き算** (`-`): `"10-3"` → `7`
- **掛け算** (`*`): `"4*6"` → `24`
- **Division** (`/`): `"8/2"` → `4`

## サポートされている入力形式

- Integers: `"5+3"`
- Decimals: `"3.5*2"`
- Negative numbers: `"-5+10"`, `"10+-3"`
- スペースを含む式: `" 1 + 2 "`

## エラー処理

### 0除算

```javascript
processMultipleOperations(["5/0"]);
// 結果: { results: [null], errors: [...], hasErrors: true }
```

### 不正な式

```javascript
processMultipleOperations(["abc+def"]);
// 結果: { results: [null], errors: [...], hasErrors: true }
```

### 正常な式とエラーの混在

```javascript
const expressions = ["1+2", "5/0", "3*4"];
const result = processMultipleOperations(expressions);

console.log(result.results);           // [3, null, 12]
console.log(result.successfulResults); // [3, 12]
console.log(result.hasErrors);         // true
console.log(result.errors);            // エラーの詳細
```

## 戻り値の形式

`processMultipleOperations()` の戻り値:

```javascript
{
  results: Array<number|null>,          // 全ての結果（エラーの場合はnull）
  successfulResults: Array<number>,     // 成功した結果のみ
  errors: Array<{                       // エラー情報
    index: number,                      // エラーが発生した式のインデックス
    expression: string,                 // エラーが発生した式
    error: string                       // エラーメッセージ
  }>,
  hasErrors: boolean                    // エラーがあるかどうか
}
```

## ファイル構成

- `arithmetic.js` - 基本的な四則演算関数
- `multipleOperations.js` - 複数演算処理機能
- `test-multiple-operations.js` - テストファイル
- `example-usage.js` - 使用例

## 実行方法

```bash
# テストの実行
node test-multiple-operations.js

# 使用例の実行
node example-usage.js
```