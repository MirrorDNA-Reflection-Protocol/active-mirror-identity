// ⟡ Mirror Shield Background Worker
// Recursion 5 Implementation

chrome.runtime.onInstalled.addListener(() => {
    console.log("⟡ Mirror Shield Installed. Guardian Active.");
});

// Watch for Hostile URLs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (tab.url.includes("chatgpt.com")) {
            console.log("⚠️ Hostile Environment Detected: OpenAI");
            chrome.action.setBadgeText({ text: "LOCK", tabId: tabId });
            chrome.action.setBadgeBackgroundColor({ color: "#F00" });
        } else if (tab.url.includes("localhost")) {
            console.log("✅ Trusted Environment Detected: Localhost");
            chrome.action.setBadgeText({ text: "OPEN", tabId: tabId });
            chrome.action.setBadgeBackgroundColor({ color: "#0F0" });
        }
    }
});
