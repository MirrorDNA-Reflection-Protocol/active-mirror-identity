"""
API Ports v1.0
Exposes Deterministic and Creative access points to the Kernel.
"""

from typing import Dict, Any
from identity_kernel.scd_transformer import SCDTransformer
from mirrorDNA.symbolic_extractor import SymbolicThreadExtractor

class DeterministicPort:
    """
    STRICT MODE: Fact-only retrieval. Temperature 0 equivalent.
    """
    def __init__(self, transformer: SCDTransformer):
        self.transformer = transformer

    def read_core(self) -> Dict[str, Any]:
        return self.transformer.current_state

class CreativePort:
    """
    CREATIVE MODE: Identity + Style/Vibe.
    """
    def __init__(self, transformer: SCDTransformer, extractor: SymbolicThreadExtractor):
        self.transformer = transformer
        self.extractor = extractor

    def read_context(self) -> Dict[str, Any]:
        """
        Merges strict identity with symbolic style threads.
        """
        core = self.transformer.current_state
        style = self.extractor.get_index()
        
        return {
            "identity": core,
            "style_guide": style,
            "mode": "CREATIVE_SYNTHESIS"
        }
