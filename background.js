const INTERVAL_MS = 1000;

let intervalId = undefined;

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message === 'enable') {
    clearInterval(intervalId);
    intervalId = undefined;
    const tab = await getCurrentTab();
    intervalId = setInterval(() =>
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => location.reload()
      }),
      INTERVAL_MS
    );
  } else if (message === 'disable') {
    clearInterval(intervalId);
    intervalId = undefined;
  } else if (message === 'get-current-status') {
    sendResponse(!!intervalId);
    return true;
  }
});

async function getCurrentTab() {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  return tabs[0];
}