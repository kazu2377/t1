// test-multiple-operations.js - 複数の四則演算機能のテスト

import { processMultipleOperations } from './multipleOperations.js';

console.log('=== 複数の四則演算機能のテスト ===\n');

// 基本的な使用例（要件から）
console.log('【基本例】');
const basicExpressions = ["1+2", "10-3", "4*6", "8/2"];
console.log('入力:', basicExpressions);

const basicResults = processMultipleOperations(basicExpressions);
console.log('出力:', basicResults.results);
console.log('期待値: [3, 7, 24, 4]');
console.log('結果:', JSON.stringify(basicResults.results) === JSON.stringify([3, 7, 24, 4]) ? '✓ 成功' : '✗ 失敗');
console.log('');

// より複雑な例
console.log('【複雑な例】');
const complexExpressions = [
  "15+25",      // 40
  "100-37",     // 63  
  "7*8",        // 56
  "84/12",      // 7
  "-5+10",      // 5
  "3.5*2",      // 7
  "9.6/1.2"     // 8
];
console.log('入力:', complexExpressions);

const complexResults = processMultipleOperations(complexExpressions);
console.log('出力:', complexResults.results);
console.log('');

// エラーハンドリングの例
console.log('【エラーハンドリング例】');
const mixedExpressions = [
  "5+5",        // 10 (正常)
  "10/0",       // エラー: ゼロ除算
  "3*4",        // 12 (正常)
  "abc+def",    // エラー: 不正な式
  "15-8"        // 7 (正常)
];
console.log('入力:', mixedExpressions);

const mixedResults = processMultipleOperations(mixedExpressions);
console.log('出力:', mixedResults.results);
console.log('成功した結果のみ:', mixedResults.successfulResults);
console.log('エラー詳細:');
mixedResults.errors.forEach(error => {
  console.log(`  - 式 ${error.index + 1} (${error.expression}): ${error.error}`);
});
console.log('');

console.log('=== テスト完了 ===');