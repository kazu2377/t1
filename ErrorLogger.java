import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 簡易エラーログユーティリティ。
 * 例外情報を `error.log` に追記します。
 */
public class ErrorLogger {
    private static final String LOG_FILE = "error.log";

    public static void log(Exception e) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        StringWriter sw = new StringWriter();
        e.printStackTrace(new PrintWriter(sw));
        String stackTrace = sw.toString();

        String entry = String.format("[%s] %s: %s\n%s\n", timestamp, e.getClass().getName(), e.getMessage(), stackTrace);

        try (FileWriter fw = new FileWriter(LOG_FILE, true)) {
            fw.write(entry);
        } catch (IOException ioe) {
            System.err.println("Failed to write error log: " + ioe.getMessage());
        }
    }
}
