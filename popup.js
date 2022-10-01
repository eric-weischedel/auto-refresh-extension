const input = document.getElementById("autoRefreshEnabledToggle");

chrome.runtime.sendMessage('get-current-status', (response) => {
  input.checked = response;
});

input.addEventListener("click", async (e) => {
  chrome.runtime.sendMessage(e.target.checked ? 'enable' : 'disable');
});