'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

// TODO 
// content selection upload to ipfs
// get the cid
// send to the popup and display

// 1. Content selection in console

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sample context action",
    title: "Save Version",
    type: 'normal',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(
  (info, tab) => {
    console.log(tab.url);
    chrome.tabs.create({
      url: "http://www.urbandictionary.com/define.php?term=" + encodeURIComponent(info.selectionText)
    });
  });

/////////////// DATA FLOW 1 METHODS /////////////// 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'REQ') {
    chrome.tabs.onActivated.addListener((activeInfo) => {
      console.log("TAB infooo from bg: " + activeInfo.tabId);
    });
    // TAB ID is undefined
    const message = `Lets pretend I went to ipfs ${request.payload.eyed}`;

    // Log message coming from the `request` parameter
    console.log(message);
    // Send a response message
    sendResponse({
      message: message
    });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("background: tab changed");
});

//// On tab change message from content
// ? cache these in local storage ? if not there, then lookup
// lookup on ipfs, get the count of diffs, most recent diff date
//update the current tab info localStorage

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   console.log("rerender the popup");
//   console.log(activeInfo.tabId);
//   chrome.storage.sync.set({ "currentTabPopupInfo": { "id": activeInfo.tabId } }, function () {
//     console.log('Value is set to ' + activeInfo.tabId);
//   });
// });


  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO