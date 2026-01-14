from flask import Blueprint, request, jsonify
from protocols.bb84 import simulate_bb84

bb84_api = Blueprint("bb84_api", __name__)

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
