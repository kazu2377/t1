# 複数の四則演算機能

複数の四則演算（加算、減算、乗算、除算）をまとめて実行できる機能です。

## 機能概要

- 複数の演算式を配列で受け取り、それぞれの結果を返します
- 不正な式やゼロ除算などのエラーハンドリングを行います
- 結果を分かりやすくまとめて返します

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

## 対応している演算

- **加算** (`+`): `"1+2"` → `3`
- **減算** (`-`): `"10-3"` → `7`
- **乗算** (`*`): `"4*6"` → `24`
- **除算** (`/`): `"8/2"` → `4`

## 対応している入力形式

- 整数: `"5+3"`
- 小数: `"3.5*2"`
- 負数: `"-5+10"`, `"10+-3"`
- 空白を含む式: `" 1 + 2 "`

## エラーハンドリング

### ゼロ除算

```javascript
processMultipleOperations(["5/0"]);
// 結果: { results: [null], errors: [...], hasErrors: true }
```

### 不正な式

```javascript
processMultipleOperations(["abc+def"]);
// 結果: { results: [null], errors: [...], hasErrors: true }
```

### 混在する正常・異常な式

```javascript
const expressions = ["1+2", "5/0", "3*4"];
const result = processMultipleOperations(expressions);

console.log(result.results);           // [3, null, 12]
console.log(result.successfulResults); // [3, 12]
console.log(result.hasErrors);         // true
console.log(result.errors);            // エラー詳細
```

## 返り値の形式

`processMultipleOperations()` の返り値：

```javascript
{
  results: Array<number|null>,          // すべての結果（エラーの場合はnull）
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
- `multipleOperations.js` - 複数演算の処理機能
- `test-multiple-operations.js` - テストファイル
- `example-usage.js` - 使用例

## 実行方法

```bash
# テストの実行
node test-multiple-operations.js

# 使用例の実行
node example-usage.js
```