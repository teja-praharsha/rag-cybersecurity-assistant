def generate_guidance(attack, sources):
    if not sources:
        return [
            f"No local knowledge document matched {attack}. Validate the model output with logs and security telemetry."
        ]

    return [
        f"Investigate the predicted {attack} activity and correlate it with network and endpoint logs.",
        f"Review the retrieved guidance from {sources[0]['source']} before applying containment or remediation.",
        "Treat the ML prediction as decision support, not as proof of an incident.",
    ]
