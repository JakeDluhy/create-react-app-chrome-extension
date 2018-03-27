window.chrome.browserAction.onClicked.addListener((tab) => {
  window.chrome.tabs.executeScript(tab.id, { file: 'entry.js' });
});
