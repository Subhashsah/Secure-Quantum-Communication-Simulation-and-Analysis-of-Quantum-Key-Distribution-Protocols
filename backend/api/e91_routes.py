from flask import Blueprint, request, jsonify
from protocols.e91 import simulate_e91


e91_api = Blueprint("e91_api", __name__)


@e91_api.get("/")
def e91_home():
    return jsonify(
        {
            "protocol": "E91",
            "message": "Use POST /api/e91/simulate with JSON body: {total_pairs, eve_prob, noise_prob, bell_ratio, eve_mode}",
        }
    )


@e91_api.get("/simulate")
def e91_simulate_info():
    return jsonify(
        {
            "method": "POST",
            "endpoint": "/api/e91/simulate",
            "body": {
                "total_pairs": 1000,
                "eve_prob": 0.0,
                "noise_prob": 0.0,
                "bell_ratio": 0.2,
                "eve_mode": "both",
            },
        }
    )


@e91_api.route("/simulate", methods=["POST"])
def simulate():
    """E91 simulation endpoint"""
    try:
        data = request.json or {}
        result = simulate_e91(
            total_pairs=int(data.get("total_pairs", 1000)),
            eve_prob=float(data.get("eve_prob", 0.0)),
            noise_prob=float(data.get("noise_prob", 0.0)),
            bell_ratio=float(data.get("bell_ratio", 0.2)),
            eve_mode=data.get("eve_mode", "both"),
        )
        return jsonify(result)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400
