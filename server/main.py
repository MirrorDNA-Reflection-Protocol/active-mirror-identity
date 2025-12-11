from mcp.server.fastmcp import FastMCP
import json
import os
import sys

# Ensure we can import from core
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.temporal import TemporalSelfModule
from core.emotional import EmotionalRhythmModule
from core.consensus import ConsensusModule
from core.retrieval import IdentityRetrievalModule
from core.vault_sync import VaultSyncModule
from core.timeline import TimelineModule
from core.mirrors import InternalMirrorsModule
from core.recovery import RecoveryModule
from core.persona import PersonaModule
from core.collaboration import CollaborationModule

# ⟡ Mirror MCP Server (v1.0 - Modular Sovereign Kernel)
mcp = FastMCP("Mirror Identity v1.0")

# Initialize Modules
temporal = TemporalSelfModule()
emotional = EmotionalRhythmModule()
consensus = ConsensusModule()
retrieval = IdentityRetrievalModule()
vault = VaultSyncModule()
timeline = TimelineModule()
mirrors = InternalMirrorsModule()
recovery = RecoveryModule()
persona = PersonaModule()
collab = CollaborationModule()

# ========== CORE KERNEL TOOLS (Legacy Support) ==========

@mcp.tool()
def get_identity_kernel() -> str:
    """Retrieve the Sovereign Identity Kernel."""
    return json.dumps(temporal.load_kernel(), indent=2)

@mcp.tool()
def update_identity_kernel(field: str, value: str, writer: str = "claude") -> str:
    """Update a specific field in the identity kernel."""
    kernel = temporal.load_kernel()
    
    try:
        parsed_value = json.loads(value)
    except (json.JSONDecodeError, TypeError):
        parsed_value = value
        
    keys = field.split('.')
    target = kernel
    for key in keys[:-1]:
        if key not in target: target[key] = {}
        target = target[key]
    target[keys[-1]] = parsed_value
    
    temporal.save_kernel(kernel, writer)
    return json.dumps({"success": True, "field": field, "value": parsed_value})

# ========== NEW v1.0 IDENTITY TOOLS ==========

@mcp.tool()
def get_temporal_profile() -> str:
    """Get identity age, version, and evolution stats."""
    return json.dumps(temporal.get_temporal_profile(), indent=2)

@mcp.tool()
def get_mood_trace() -> str:
    """Get emotional rhythm and energy prediction."""
    return json.dumps(emotional.analyze_rhythm(), indent=2)

@mcp.tool()
def predict_next_4h() -> str:
    """Predict energy/cognitive state for next 4 hours."""
    return json.dumps(emotional.predict_next_4h(), indent=2)

@mcp.tool()
def request_context(agent_name: str) -> str:
    """Request multi-agent context consensus."""
    return json.dumps(consensus.request_context(agent_name), indent=2)

@mcp.tool()
def retrieve_identity_context(query: str) -> str:
    """Retrieve specific identity facets based on query."""
    return json.dumps(retrieval.retrieve_identity_context(query), indent=2)

@mcp.tool()
def sync_vault(event_type: str, content: str) -> str:
    """Log an event to the Obsidian Vault."""
    return json.dumps(vault.sync_vault(event_type, content), indent=2)

@mcp.tool()
def add_timeline_event(category: str, description: str, writer: str) -> str:
    """Add a significant life event to the timeline."""
    return json.dumps(timeline.add_timeline_event(category, description, writer), indent=2)

@mcp.tool()
def mirror_reflect() -> str:
    """Perform self-analysis and drift detection."""
    return json.dumps(mirrors.mirror_reflect(), indent=2)

@mcp.tool()
def recover_identity() -> str:
    """Attempt a fail-safe restore from backup."""
    return json.dumps(recovery.recover_identity(), indent=2)

@mcp.tool()
def get_persona_profile() -> str:
    """Get writing tone and style guidelines."""
    return json.dumps(persona.get_persona_profile(), indent=2)

@mcp.tool()
def negotiate_collaboration(task_type: str) -> str:
    """Get protocol for Human-AI collaboration on a task."""
    return json.dumps(collab.negotiate_collaboration(task_type), indent=2)

if __name__ == "__main__":
    mcp.run()
