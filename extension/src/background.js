'use strict';


/////////////// DATA FLOW 1 METHODS /////////////// 

//// On tab change message from content
// ? cache these in local storage ? if not there, then lookup
// lookup on ipfs, get the count of diffs, most recent diff date
// return info to popup

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'POPUPREQ') {

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {

      // Get url data from cache/ipfs here
      var tabURL = tabs[0].url;

      console.log("Data path 1 step 2");

      sendResponse({
        type: "BACKRES",
        url: tabURL,
        n: 3,
        dateLast: "03/11/2022"
      });
      console.log("Msg sent");
    });

    // Retquired to keep message port alive until finished
    return true;
  }
});

/////////////// DATA FLOW 2 METHODS ///////////////

// TODO

// Context Menu POC

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
