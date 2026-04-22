from flask import Flask
from flask_cors import CORS
from api.bb84_routes import bb84_api
from api.e91_routes import e91_api
from api.bbm92_routes import bbm92_api
from api.b92_routes import b92_api

app = Flask(__name__)
CORS(app)


@app.get("/")
def home():
    return {
        "message": "QKD backend is running",
        "endpoints": [
            "/api/bb84/simulate",
            "/api/e91/simulate",
            "/api/bbm92/simulate",
            "/api/b92/simulate",
        ],
    }

# Register API blueprints
app.register_blueprint(bb84_api, url_prefix="/api/bb84")
app.register_blueprint(e91_api, url_prefix="/api/e91")
app.register_blueprint(bbm92_api, url_prefix="/api/bbm92")
app.register_blueprint(b92_api, url_prefix="/api/b92")

if __name__ == "__main__":
    app.run(debug=True, port=4000)

