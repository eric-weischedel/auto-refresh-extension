const autoRefreshEnabledToggle = document.getElementById("autoRefreshEnabledToggle");
const refreshIntervalInput = document.getElementById("refreshIntervalInput");

chrome.runtime.sendMessage('get-current-status', (response) => {
  autoRefreshEnabledToggle.checked = response.enabled;
  refreshIntervalInput.value = response.interval
});

autoRefreshEnabledToggle.addEventListener("click", (e) => {
  chrome.runtime.sendMessage(e.target.checked ? 'enable' : 'disable');
});

refreshIntervalInput.addEventListener("input", (e) => {
  chrome.runtime.sendMessage({ type: 'set-refresh-interval', payload: { interval: e.target.value } })
})