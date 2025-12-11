\
$preamble = Get-Content ".\00_Canonical\MirrorRelay_Preamble_v1.md" -Raw
Set-Clipboard -Value $preamble
Write-Host "[Relay] Copied preamble to Windows clipboard."
