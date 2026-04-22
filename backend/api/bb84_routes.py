from flask import Blueprint, request, jsonify
from protocols.bb84 import simulate_bb84

bb84_api = Blueprint("bb84_api", __name__)


@bb84_api.get("/")
def bb84_home():
    return jsonify(
        {
            "protocol": "BB84",
            "message": "Use POST /api/bb84/simulate with JSON body: {bits, noise, eve}",
        }
    )


@bb84_api.get("/simulate")
def bb84_simulate_info():
    return jsonify(
        {
            "method": "POST",
            "endpoint": "/api/bb84/simulate",
            "body": {"bits": 1000, "noise": 0.0, "eve": 0.0},
        }
    )

@bb84_api.route("/simulate", methods=["POST"])
def simulate():
    data = request.json
    result = simulate_bb84(
        n=int(data["bits"]),
        depolar_prob=float(data["noise"]),
        eve_prob=float(data["eve"]),
        # seed=42
    )
    return jsonify(result)
