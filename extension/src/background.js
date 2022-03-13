'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${sender.tab ? 'Con' : 'Pop'
      }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    // Send a response message
    sendResponse({
      message,
    });
  }
});


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

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO