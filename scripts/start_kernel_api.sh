#!/bin/bash
# ⟡ Start Kernel API — Run from Terminal (has Full Disk Access)
cd /Users/mirror-admin/Documents/GitHub/active-mirror-identity
nohup python3 kernel_api.py > /Users/mirror-admin/logs/kernel_api.log 2>&1 &
echo "⟡ Kernel API started on http://localhost:8082"
