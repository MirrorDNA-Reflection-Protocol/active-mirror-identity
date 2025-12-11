# Emergency Override Note (Human Steward)

- Purpose: Pause any autonomous behavior. Restore Safe Present rules.
- Action: If outputs fail verification or feel unsafe, declare:
  **⟡⟦HALT⟧ — Enter Emergency Local-Only Mode.**
- Steps:
  1) Stop external API calls.
  2) Reload Master_Citation_v7_6_Expanded.md.
  3) Re-run Truth_State_Guard_Test_v1.md.
  4) Resume only after ⟡⟦VERIFIED⟧.