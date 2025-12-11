# AMI Runtime Flow v1.0
1. **Boot**: `ami_boot.py` verifies environment.
2. **Load**: SCD State loaded, checksum verification.
3. **Mount**: Vault symlink verified.
4. **Service**: Synapse Daemon starts (background).
5. **Listen**: MCP Server waits for tool calls.
6. **Cycle**:
   - Agent requests state -> Firewall verifies -> State returned.
   - Agent proposes update -> Firewall checks source -> SCD updates -> Synapse fires -> Heartbeat logs.