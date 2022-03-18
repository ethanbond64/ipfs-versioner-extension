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
      // var tabURL = tabs[0].url;

      console.log("Data path 1 step 2");
      // let ff = sampleFetch();
      // let ff = "pausing fetches for now";
      // console.log(ff);

      sendResponse(getAllInfo(tabs[0].url));
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
    console.log("Data path 2 step 1");
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tab.id, {
      type: "NEWDIFF",
      contents: {
        oldText: "THE OLD TEXT",
        newText: info.selectionText
      }
    });
    // });
  });


//// Data Access Methods

function getAllInfo(url) {

  // Lookup url entry in the distributed db

  // get all other info (including cids) from the distributed db

  // loop over cids and get version text

  // build an object to send
  return {
    type: "BACKRES",
    url: url,
    n: Math.floor((Math.random() * 5)),
    dateLast: "03/11/2022",
    testData: [{ content: "!AA Content", date: "A Date" }, { content: "BB! Content", date: "B DDDDate" }, { content: "CC! Content", date: "C Date" }]
  }

}

function getLatestVersion(url) {

  // Lookup url entry in the distributed db

  // get latest cid, date

  // lookup cid and get text

  return { content: "!AA Content", date: "A Date" }

}

function uploadNewVersion(url, text) {

  // upload the text to ipfs and hold on to cid

  // create db entry keyed by this url with version number, date, and [cid]

}