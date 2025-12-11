import json
import sys
from pathlib import Path

# Add parent dir to path if running as script
if __name__ == "__main__":
    AMI_ROOT = Path(__file__).parent.parent
    sys.path.append(str(AMI_ROOT))

# Now import
from identity_kernel.scd_transformer import SCDTransformer

def inject_axioms(ami_root: Path):
    vault_path = ami_root / "vault"
    kernel_path = ami_root / "identity_kernel" / "scd_state.json"
    
    if not vault_path.exists():
        print("❌ Vault not found (symlink missing?)")
        return

    transformer = SCDTransformer(kernel_path)
    
    # 1. Define Core Axioms (Normally read from Vault files, hardcoded for bootstrap stability)
    axioms = {
        "identity.glyphsig": "⟡",
        "identity.anchors": ["Truth", "Sovereignty", "Continuity"],
        "vault.pointer": str(vault_path.resolve()),
        "system.version": "AMI v1.0",
        "system.mode": "Sovereign"
    }

    # 2. Inject
    print("💉 Injecting Axioms into Kernel...")
    state = transformer.supersede(axioms)
    print(f"✅ Injection Complete. Turn: {state['turn']}")
    print(f"   Checksum: {state['checksum']}")

if __name__ == "__main__":
    import sys
    AMI_ROOT = Path(__file__).parent.parent
    sys.path.append(str(AMI_ROOT))
    inject_axioms(AMI_ROOT)
