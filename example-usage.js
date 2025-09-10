// example-usage.js - 複数四則演算機能の使用例

import { processMultipleOperations, evaluateExpression } from './multipleOperations.js';

console.log('=== 複数四則演算の使用例 ===\n');

// 単一式の計算
console.log('【単一式の計算】');
try {
  console.log('5 + 3 =', evaluateExpression('5+3'));
  console.log('12 / 4 =', evaluateExpression('12/4'));
} catch (error) {
  console.error('エラー:', error.message);
}
console.log('');

// 複数式の一括計算（推奨使用方法）
console.log('【複数式の一括計算】');
const expressions = ['1+2', '10-3', '4*6', '8/2'];
const result = processMultipleOperations(expressions);

console.log('入力:', expressions);
console.log('結果:', result.results);

if (result.hasErrors) {
  console.log('エラーが発生しました:');
  result.errors.forEach(error => {
    console.log(`  ${error.expression}: ${error.error}`);
  });
} else {
  console.log('すべての計算が正常に完了しました！');
}
console.log('');

// 実践的な例
console.log('【実践例 - 商品価格計算】');
const priceCalculations = [
  '100*1.1',    // 商品A: 100円 + 10%税込み
  '250*0.8',    // 商品B: 250円の20%割引  
  '500+50',     // 商品C: 500円 + 50円送料
  '1000/2'      // 商品D: 1000円を2人で割り勘
];

const priceResults = processMultipleOperations(priceCalculations);
console.log('価格計算:');
priceCalculations.forEach((expression, index) => {
  const result = priceResults.results[index];
  if (result !== null) {
    console.log(`  ${expression} = ${result}円`);
  } else {
    const error = priceResults.errors.find(e => e.index === index);
    console.log(`  ${expression} = エラー: ${error.error}`);
  }
});

console.log('\n=== 使用例終了 ===');