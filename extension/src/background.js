'use strict';
import * as IPFS from 'ipfs-core';
const toBuffer = require('it-to-buffer');

// IPFS STATIC MEMBERS

async function sampleFetch() {
  const ipfs = await IPFS.create()
  const bufferedContents = await toBuffer(ipfs.cat('QmVA1jXGzYqGNdBDk7qzMPZi1JHsEmyjiU1xuqVz5Y886z'));
  const stringContents = new TextDecoder().decode(bufferedContents);
  // Valid!
  console.log(stringContents);
  return stringContents;
}


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
      let ff = sampleFetch();
      console.log(ff);

      sendResponse({
        type: "BACKRES",
        fetched: ff,
        url: tabURL,
        n: 3,
        dateLast: "03/11/2022"
      });
      console.log("Msg sent");
    });

    // Required to keep message port alive until finished
    return true;
  }
});


//// On receive button pressed message from the popup
// Do your big search for the diffs
// Send them to the content script


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
