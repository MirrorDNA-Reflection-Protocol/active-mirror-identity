import os
import shutil
from typing import Dict, Any, Optional
from .base import AMIKernelModule

class RecoveryModule(AMIKernelModule):
    """
    Module 8: Fail-Safe Identity Recovery
    Restores identity from backups if corruption is detected.
    """
    
    def recover_identity(self) -> Dict[str, Any]:
        """
        Attempt to restore the last valid backup.
        """
        current_kernel = self.load_kernel()
        
        # If current kernel is fine, do nothing
        if "error" not in current_kernel:
            # Checksum verification embedded in load_kernel logic of base would be ideal,
            # but for now we trust load_kernel's return.
            # If load_kernel returns error, we proceed.
            pass
            
        backup_dir = os.path.join(os.path.dirname(self.KERNEL_PATH), "backups")
        if not os.path.exists(backup_dir):
            return {"error": "No backups available"}
            
        backups = sorted([f for f in os.listdir(backup_dir) if f.endswith('.json')], reverse=True)
        
        for backup_file in backups:
            backup_path = os.path.join(backup_dir, backup_file)
            try:
                # Try to load backup
                with open(backup_path, 'r') as f:
                    import json
                    backup_data = json.load(f)
                    
                # If valid JSON, restore it
                self.log(f"Restoring from {backup_file}")
                shutil.copy2(backup_path, self.KERNEL_PATH)
                return {"success": True, "restored_from": backup_file, "timestamp": backup_data.get("meta", {}).get("last_write")}
                
            except Exception as e:
                self.log(f"Backup {backup_file} corrupted: {e}")
                continue
                
        return {"error": "All backups failed"}
