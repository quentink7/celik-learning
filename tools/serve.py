"""Serveur local qui envoie les en-têtes de sécurité de vercel.json, pour tester le site comme en ligne.

    python3 tools/serve.py 8014 --demo    # mode démo : config.js servi sans identifiants Supabase
    python3 tools/serve.py 8015           # mode connecté (vrai projet Supabase)
"""
import functools, http.server, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8014
DEMO = "--demo" in sys.argv
HEADERS = [(h["key"], h["value"]) for h in json.load(open(os.path.join(ROOT, "vercel.json")))["headers"][0]["headers"]]


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        for k, v in HEADERS:
            if k == "Content-Security-Policy":
                v = v.replace("; upgrade-insecure-requests", "")  # le serveur local est en http
            self.send_header(k, v)
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if DEMO and self.path.split("?")[0] == "/assets/config.js":
            src = open(os.path.join(ROOT, "assets/config.js"), encoding="utf-8").read()
            body = re.sub(r'(supabaseUrl|supabaseAnonKey):\s*"[^"]*"', r'\1: ""', src).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def log_message(self, *a):
        pass


class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


print(f"CELIK Learning sur http://127.0.0.1:{PORT}/ ({'démo' if DEMO else 'connecté'})", flush=True)
Server(("127.0.0.1", PORT), functools.partial(Handler, directory=ROOT)).serve_forever()
