import sys
import os
import json

# Add project root to path
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

def print_result(name, result):
    print(f"\n⟡ TEST: {name}")
    print(json.dumps(result, indent=2))
    if "error" in result:
        print("❌ FAILED")
    else:
        print("✅ PASSED")

def run_tests():
    print("⟡ AMI v1.0 Verification Protocol ⟡")
    
    # 1. Temporal
    temporal = TemporalSelfModule()
    print_result("Temporal Profile", temporal.get_temporal_profile())
    
    # 2. Emotional
    emotional = EmotionalRhythmModule()
    print_result("Emotional Rhythm", emotional.analyze_rhythm())
    
    # 3. Consensus
    consensus = ConsensusModule()
    print_result("Context Request", consensus.request_context("Antigravity"))
    
    # 4. Retrieval
    retrieval = IdentityRetrievalModule()
    print_result("Identity Retrieval (Query: 'Who am I?')", retrieval.retrieve_identity_context("who am I"))
    
    # 5. Vault Sync
    # This might fail if vault path doesn't exist, which is expected in some envs
    vault = VaultSyncModule()
    print_result("Vault Sync", vault.sync_vault("TEST_EVENT", "Verified AMI v1.0"))
    
    # 6. Timeline
    timeline = TimelineModule()
    print_result("Timeline Add", {"success": timeline.add_timeline_event("verification", "Ran verify_ami_v1.py", "Antigravity")})
    
    # 7. Mirrors
    mirrors = InternalMirrorsModule()
    print_result("Internal Mirror", mirrors.mirror_reflect())
    
    # 8. Recovery
    recovery = RecoveryModule()
    # We won't force a recovery here to avoid overwriting live kernel, just check init
    print("⟡ TEST: Recovery Module Init")
    if recovery.KERNEL_PATH: print("✅ PASSED")
    
    # 9. Persona
    persona = PersonaModule()
    print_result("Persona Profile", persona.get_persona_profile())
    
    # 10. Collaboration
    collab = CollaborationModule()
    print_result("Collaboration Proto", collab.negotiate_collaboration("code_edit"))

if __name__ == "__main__":
    run_tests()
