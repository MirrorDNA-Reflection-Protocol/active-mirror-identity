"""
AMI v1.0 Core Modules

Active Mirror Identity — Sovereign Identity Kernel
"""

from .base import AMIKernelModule
from .temporal import TemporalSelfModule
from .emotional import EmotionalRhythmModule
from .consensus import ConsensusModule
from .retrieval import IdentityRetrievalModule
from .vault_sync import VaultSyncModule
from .timeline import TimelineModule
from .mirrors import InternalMirrorsModule
from .recovery import RecoveryModule
from .persona import PersonaModule
from .collaboration import CollaborationModule

__version__ = "1.0.0"

__all__ = [
    "AMIKernelModule",
    "TemporalSelfModule",
    "EmotionalRhythmModule",
    "ConsensusModule",
    "IdentityRetrievalModule",
    "VaultSyncModule",
    "TimelineModule",
    "InternalMirrorsModule",
    "RecoveryModule",
    "PersonaModule",
    "CollaborationModule",
]
