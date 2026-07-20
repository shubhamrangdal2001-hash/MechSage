"""Static fault signature mapping for translating sensor deltas to hypotheses."""

# Dictionary mapping subsets of degrading sensors to a known fault hypothesis.
# Sensors have an optional directional suffix (↑/↓).
FAULT_SIGNATURES = {
    # HPC Degradation (High Pressure Compressor)
    frozenset(["s2↑", "s3↑", "s4↑", "s7↓"]): "high pressure compressor degradation",
    frozenset(["s2↑", "s3↑", "s4↑", "s7↑", "s11↑"]): "high pressure compressor degradation",
    
    # Bearing / Lubrication Wear
    frozenset(["s11↑", "s12↑"]): "bearing wear",
    frozenset(["s14↑"]): "bearing wear",
    
    # Fan Blade Degradation
    frozenset(["s8↓", "s13↓"]): "fan degradation",
    frozenset(["s8↓", "s13↓", "s15↓"]): "fan degradation",
    
    # Bleed Valve Leak
    frozenset(["s17↑", "s20↑"]): "bleed valve leak",
}


def lookup_fault_hypothesis(degrading_sensors: list[str]) -> str:
    """
    Match a list of degrading sensor strings (e.g. ['s2↑', 's3↑']) 
    to a known fault hypothesis.
    
    Returns 'general' if no specific signature matches.
    """
    input_set = frozenset(degrading_sensors)
    
    # Simple subset matching (if the signature is a subset of the input sensors)
    for signature, hypothesis in FAULT_SIGNATURES.items():
        if signature.issubset(input_set):
            return hypothesis
            
    return "general"
