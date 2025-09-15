# サンプル: 独自例外の使用例（日本語）

このリポジトリには、Javaで独自の例外クラスを作成し、投げて捕捉する簡単なサンプルが含まれています。

ファイル:
- `CustomException.java` - `Exception` を継承したカスタム例外クラス
- `Main.java` - 例外を投げる `process` メソッドと、`main` での捕捉例

ビルドと実行:
```bash
javac Main.java CustomException.java
java Main
```

期待される出力:

```
Processing value: 5
Processed successfully: 5
Processing value: -1
Caught CustomException: Negative value not allowed: -1
Program continues after exception handling.
```

拡張案:
- 例外クラスにエラーコードや原因を追加する
- `RuntimeException` を継承して非チェック例外にする
- JUnit を使った例外テストを追加する

ブラウザでのConsole確認:

1. ワークスペースの `sample_with_console.html` をブラウザで開く（ファイルをダブルクリックするか、ブラウザで `file://` 経路を指定）。
2. 開発者ツールを開き（通常は F12 または Ctrl+Shift+I）、`Console` タブを確認します。
3. ボタンを押すと `console.log` / `console.error` の出力が表示されます。

簡易HTTPサーバで表示する例（Pythonがある場合）:
```bash
# カレントディレクトリをワークスペースのルートにして実行
python3 -m http.server 8000
# ブラウザで http://localhost:8000/sample_with_console.html を開く
```
