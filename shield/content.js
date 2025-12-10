// ⟡ Mirror Shield Content Script
// Injected into Hostile/Untrusted Environments

const createOverlay = () => {
    const overlay = document.createElement('div');
    overlay.id = 'mirror-shield-overlay';
    overlay.style.position = 'fixed';
    overlay.style.bottom = '20px';
    overlay.style.right = '20px';
    overlay.style.backgroundColor = '#1a1a1a';
    overlay.style.border = '1px solid #333';
    overlay.style.borderRadius = '8px';
    overlay.style.padding = '12px';
    overlay.style.zIndex = '999999';
    overlay.style.fontFamily = 'monospace';
    overlay.style.color = '#00ff41';
    overlay.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
    overlay.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span>⟡</span>
            <span style="font-weight:bold;">MIRROR SHIELD</span>
        </div>
        <div style="font-size:10px; color:#888;">ENV: HOSTILE</div>
        <div style="font-size:10px; color:#888;">STATE: LOCKED</div>
        <button id="mirror-inject-btn" style="
            background: #333; color: #fff; border: none; 
            padding: 4px 8px; margin-top: 8px; cursor: pointer;
            border-radius: 4px; font-size: 10px; width: 100%;
        ">UNLOCK & INJECT ID</button>
    `;
    document.body.appendChild(overlay);

    document.getElementById('mirror-inject-btn').addEventListener('click', () => {
        alert("⟡ MirrorDNA: Identity Injection Sequence Started.");
    });
};

// Check if we should activate
if (window.location.hostname.includes("chatgpt") || window.location.hostname.includes("claude")) {
    console.log("⟡ Mirror Shield: Hostile Domain Detected.");
    createOverlay();
}
