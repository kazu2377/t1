# Simple Python Authentication Server
# This fixes the 401 Unauthorized error mentioned in the bug report

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.parse

# Valid user credentials - same as frontend
VALID_USERS = {
    "user1": "password1",
    "admin": "admin123", 
    "test": "test123"
}

class AuthHandler(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """Handle authentication requests"""
        if self.path == '/api/login':
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                username = data.get('username', '')
                password = data.get('password', '')
                
                # Fixed authentication logic - was previously always returning 401
                # Bug was here: incorrect password validation
                if username in VALID_USERS and VALID_USERS[username] == password:
                    # Authentication successful
                    response = {
                        "status": "success",
                        "message": "認証が成功しました",
                        "user": username
                    }
                    self.send_response(200)
                else:
                    # Authentication failed
                    response = {
                        "status": "error", 
                        "message": "認証に失敗しました"
                    }
                    self.send_response(401)  # This was the error being reported
                
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                error_response = {"status": "error", "message": f"サーバーエラー: {str(e)}"}
                self.wfile.write(json.dumps(error_response, ensure_ascii=False).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_GET(self):
        """Serve static files"""
        if self.path == '/' or self.path == '/index.html':
            self.serve_file('index.html', 'text/html')
        elif self.path == '/dashboard.html':
            self.serve_file('dashboard.html', 'text/html')
        else:
            self.send_response(404)
            self.end_headers()
    
    def serve_file(self, filename, content_type):
        """Serve static HTML files"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', f'{content_type}; charset=utf-8')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()

def run_server(port=8000):
    """Start the authentication server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, AuthHandler)
    print(f"認証サーバーが起動しました: http://localhost:{port}")
    print("利用可能なアカウント:")
    for username, password in VALID_USERS.items():
        print(f"  {username} / {password}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()