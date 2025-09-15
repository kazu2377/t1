/**
 * サンプルプログラム（日本語コメント）
 * `CustomException` を投げて捕捉する例を示します。
 */
public class Main {
    public static void main(String[] args) {
        try {
            // 正常な値を処理
            process(5);
            // 負の値を処理すると例外が投げられる
            process(-1);
        } catch (CustomException e) {
            // 例外をキャッチしてメッセージを表示
            System.err.println("Caught CustomException: " + e.getMessage());
            // エラーログに追記
            ErrorLogger.log(e);
        }

        // 例外処理後もプログラムは継続する
        System.out.println("Program continues after exception handling.");
    }

    /**
     * 値を処理するメソッド。負の値ならカスタム例外を投げる。
     * @param value 処理する整数
     * @throws CustomException 負の値が渡された場合
     */
    static void process(int value) throws CustomException {
        System.out.println("Processing value: " + value);
        if (value < 0) {
            throw new CustomException("Negative value not allowed: " + value);
        }
        System.out.println("Processed successfully: " + value);
    }
}
