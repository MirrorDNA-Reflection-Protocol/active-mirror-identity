"""
AMI Exchange v1.0
Handles Universal Import/Export of .ami bundles.
"""

import shutil
import zipfile
import logging
from pathlib import Path
from typing import Optional

logger = logging.getLogger("ami.api.exchange")

class Exchange:
    def __init__(self, ami_root: Path):
        self.ami_root = ami_root
        self.vault_path = ami_root / "vault"
        self.identity_path = ami_root / "identity_kernel" / "scd_state.json"
        
    def export_bundle(self, output_path: Path) -> Path:
        """
        Create a .ami bundle (zip) containing identity state and vault.
        """
        try:
            # Create a temporary directory structure for the bundle
            temp_dir = self.ami_root / "temp_export"
            temp_dir.mkdir(exist_ok=True)
            
            # Copy Identity State
            if self.identity_path.exists():
                shutil.copy2(self.identity_path, temp_dir / "identity_state.json")
            
            # Copy Vault (using shutil.make_archive would be recursive, but we want structure)
            # Actually, standard zip is better.
            
            bundle_path = str(output_path).replace(".ami", "") # make_archive adds extension
            
            shutil.make_archive(bundle_path, 'zip', self.ami_root, ".")
            
            final_path = Path(f"{bundle_path}.zip")
            ami_path = final_path.with_suffix(".ami")
            final_path.rename(ami_path)
            
            return ami_path
            
        except Exception as e:
            logger.error(f"Export failed: {e}")
            raise

    def import_bundle(self, bundle_path: Path) -> bool:
        """
        Import a .ami bundle. WARNING: Overwrites current state.
        """
        try:
            if not bundle_path.exists():
                raise FileNotFoundError(f"Bundle not found: {bundle_path}")
                
            # Verify it is a valid zip
            if not zipfile.is_zipfile(bundle_path):
                raise ValueError("Invalid bundle format")
                
            # Unzip to root (overwriting)
            with zipfile.ZipFile(bundle_path, 'r') as zf:
                zf.extractall(self.ami_root)
                
            return True
            
        except Exception as e:
            logger.error(f"Import failed: {e}")
            return False
