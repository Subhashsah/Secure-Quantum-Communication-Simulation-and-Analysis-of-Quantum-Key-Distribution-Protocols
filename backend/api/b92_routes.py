from flask import Blueprint, request, jsonify
from protocols.b92 import simulate_b92

b92_api = Blueprint("b92_api", __name__)


@b92_api.get("/")
def b92_home():
    return jsonify(
        {
            "protocol": "B92",
            "message": "Use POST /api/b92/simulate with JSON body: {bits, noise, eve}",
        }
    )


@b92_api.get("/simulate")
def b92_simulate_info():
    return jsonify(
        {
            "method": "POST",
            "endpoint": "/api/b92/simulate",
            "body": {"bits": 1000, "noise": 0.0, "eve": 0.0},
        }
    )

@b92_api.route("/simulate", methods=["POST"])
def simulate():
    data = request.json
    result = simulate_b92(
        n=int(data["bits"]),
        noise_prob=float(data["noise"]),
        eve_prob=float(data["eve"]),
    )
    return jsonify(result)
