from flask import Flask
from flask_cors import CORS
from api.bb84_routes import bb84_api

app = Flask(__name__)
CORS(app)

app.register_blueprint(bb84_api, url_prefix="/api/bb84")

if __name__ == "__main__":
    app.run(debug=True, port=3000)
