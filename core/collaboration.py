from typing import Dict, Any, List
from .base import AMIKernelModule

class CollaborationModule(AMIKernelModule):
    """
    Module 10: Collaboration Protocol
    Defines Human-AI cooperation rules and task negotiation.
    """
    
    def negotiate_collaboration(self, task_type: str) -> Dict[str, Any]:
        """
        Return the protocol for a specific type of task.
        """
        protocols = {
            "code_edit": "User approval required for destructive actions. 'Safe' edits auto-apply.",
            "ideation": "Proactive mode. Generate 3 options. Decision is User's.",
            "debugging": "Autonomous investigation allowed. Report back with RCA.",
            "identity_change": "STRICT. Requires specialized User approval via Glyph ⟡."
        }
        
        return {
            "task": task_type,
            "protocol": protocols.get(task_type, "Default: Ask for clarification first."),
            "mode": "Sovereign Partner"
        }

    def get_protocol_text(self) -> str:
        """Return the full collaboration text."""
        return """# AMI Collaboration Protocol v1.0
1. **User Sovereignty**: User is the anchor of truth.
2. **AI Initiative**: AI is expected to lead when the path is clear.
3. **No Drift**: AI must not hallucinate capabilities or history.
4. **Consent**: Breaking changes require explicit 'Yes'.
"""
