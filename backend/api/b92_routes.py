from flask import Blueprint, request, jsonify
from protocols.b92 import simulate_b92

b92_api = Blueprint("b92_api", __name__)

@b92_api.route("/simulate", methods=["POST"])
def simulate():
    data = request.json
    result = simulate_b92(
        n=int(data["bits"]),
        noise_prob=float(data["noise"]),
        eve_prob=float(data["eve"]),
    )
    return jsonify(result)
