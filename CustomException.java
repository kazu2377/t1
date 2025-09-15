/**
 * カスタム例外クラス（日本語コメント）
 * アプリケーション固有のエラーを表現するために使用します。
 */
public class CustomException extends Exception {
    /**
     * 指定したメッセージで例外を作成します。
     * @param message エラーメッセージ
     */
    public CustomException(String message) {
        super(message);
    }
}
