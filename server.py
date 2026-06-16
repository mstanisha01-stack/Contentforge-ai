#!/usr/bin/env python3
"""
ContentForge AI — Combined web server.
Serves static files AND handles form POST submissions on port 3000.
"""
import json
import os
import socketserver
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs

SUBMISSIONS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "submissions.json")

class ContentForgeHandler(SimpleHTTPRequestHandler):
    """Extended handler that also processes form submissions."""

    def do_POST(self):
        if self.path == "/submit":
            self.handle_submission()
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_cors_headers()
        self.send_response(200)
        self.end_headers()

    def handle_submission(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")
        data = parse_qs(body)

        submission = {
            "name": data.get("name", [""])[0].strip(),
            "email": data.get("email", [""])[0].strip(),
            "company": data.get("company", [""])[0].strip(),
            "timestamp": __import__("datetime").datetime.now().isoformat()
        }

        if not submission["name"] or not submission["email"]:
            self.send_json(400, {"status": "error", "message": "Name and email are required."})
            return

        # Save to JSON file
        submissions = []
        if os.path.exists(SUBMISSIONS_FILE):
            try:
                with open(SUBMISSIONS_FILE, "r") as f:
                    submissions = json.load(f)
            except (json.JSONDecodeError, ValueError):
                submissions = []

        submissions.append(submission)
        with open(SUBMISSIONS_FILE, "w") as f:
            json.dump(submissions, f, indent=2)

        print(f"[LEAD] New submission from {submission['name']} <{submission['email']}>")
        self.send_json(200, {
            "status": "ok",
            "message": f"Thanks {submission['name']}! We'll be in touch within 24 hours. ✨"
        })

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_cors_headers()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def log_message(self, format, *args):
        # Suppress static file logs for cleanliness
        if args[1] != "200":
            super().log_message(format, *args)


if __name__ == "__main__":
    port = 3000
    server = HTTPServer(("0.0.0.0", port), ContentForgeHandler)
    print(f"ContentForge AI server running on http://0.0.0.0:{port}")
    print(f"Static files served from: {os.path.dirname(os.path.abspath(__file__))}")
    print(f"Form submissions saved to: {SUBMISSIONS_FILE}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()
