from flask import Blueprint, request, jsonify
from protocols.bbm92 import simulate_bbm92

bbm92_api = Blueprint("bbm92_api", __name__)


@bbm92_api.route("/simulate", methods=["POST"])
def simulate():
    """
    BBM92 protocol simulation endpoint
    
    Expected JSON payload:
    {
        "bits": int (number of pairs),
        "noise": float (0-1),
        "eve": float (0-1)
    }
    """
    try:
        data = request.json
        result = simulate_bbm92(
            n=int(data.get("bits", 1000)),
            noise_prob=float(data.get("noise", 0.0)),
            eve_prob=float(data.get("eve", 0.0))
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
