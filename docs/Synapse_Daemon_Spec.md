# Synapse Daemon Spec
- **Process**: `metadata/synapse.py`
- **Trigger**: FileSystemEventHandler (Watchdog) on `scd_state.json`.
- **Event**: "NEURON_FIRED" logged to `synapse.log`.
- **Latency**: <500ms debounce.
- **Stability**: Tested for infinite loops (does not write back to state on read).