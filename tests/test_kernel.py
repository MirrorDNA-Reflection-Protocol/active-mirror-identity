"""
AMI Kernel Tests
"""

import sys
import unittest
import shutil
from pathlib import Path

# Add AMI root to path
AMI_ROOT = Path(__file__).parent.parent
sys.path.append(str(AMI_ROOT))

from identity_kernel.scd_transformer import SCDTransformer
from identity_kernel.firewall import ContinuityFirewall

class TestAMIKernel(unittest.TestCase):
    def setUp(self):
        self.test_dir = AMI_ROOT / "tests" / "temp_data"
        self.test_dir.mkdir(parents=True, exist_ok=True)
        self.state_file = self.test_dir / "scd_state.json"
        
        self.transformer = SCDTransformer(self.state_file)
        self.firewall = ContinuityFirewall(self.transformer)

    def tearDown(self):
        if self.test_dir.exists():
            shutil.rmtree(self.test_dir)

    def test_genesis_state(self):
        state = self.transformer.current_state
        self.assertEqual(state["checksum"], "GENESIS")
        self.assertEqual(state["turn"], 0)

    def test_state_transition(self):
        # 1. Update
        new_state = self.transformer.supersede({"project": "Test", "mode": "Debug"})
        
        self.assertEqual(new_state["turn"], 1)
        self.assertNotEqual(new_state["checksum"], "GENESIS")
        self.assertEqual(new_state["parent_checksum"], "GENESIS")
        self.assertEqual(new_state["state"]["project"], "Test")

        # 2. Verify Integrity
        self.assertTrue(self.transformer.verify_integrity(new_state))

    def test_firewall_protection(self):
        # Allow normal update
        valid, msg = self.firewall.validate_proposal({"note": "hello"})
        self.assertTrue(valid)

        # Block protected update
        valid, msg = self.firewall.validate_proposal({"identity.human.name": "Different Name"})
        self.assertFalse(valid)
        self.assertIn("protected identity fields", msg)

    def test_determinism(self):
        """Ensure same content yields same checksum"""
        s1 = self.transformer.compute_checksum({"a": 1, "b": 2})
        s2 = self.transformer.compute_checksum({"b": 2, "a": 1})
        self.assertEqual(s1, s2)

if __name__ == '__main__':
    unittest.main()
