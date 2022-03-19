'use strict';
import * as IPFS from 'ipfs-core';
const toBuffer = require('it-to-buffer');
const OrbitDB = require('orbit-db');

// IPFS STATIC MEMBERS

async function fetchCidContents(cid) {
  const ipfs = await IPFS.create();
  const bufferedContents = await toBuffer(ipfs.cat(cid));

  return new TextDecoder().decode(bufferedContents);
}

async function uploadToIpfs(contents) {
  const ipfs = await IPFS.create();
  const { cid } = await ipfs.add(contents);
  return cid;
}

async function fetchDbInfo(url) {
  const ipfs = await IPFS.create();
  const db = await OrbitDB.createInstance(ipfs);
  // kvp with key url and value {entries:[{cid, date}...]}
  const value = db.get(url);
  return value.entries;
}

async function updateDbInfo(url, cid) {
  const ipfs = await IPFS.create();
  const db = await OrbitDB.createInstance(ipfs);

  let oldValue = db.get(url);
  let newValue = { entries: [] }

  let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  if (oldValue != null) {
    newValue.entries = oldValue.entries;
  }

  newValue.entries.push({ cid: cid, date: currentDate });

  db.set(url, newValue);

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
        oldText: await getLatestVersion(tab.url),
        newText: info.selectionText
      }
    });

    // Update the db
    uploadNewVersion(info.selectionText);

  });


//// Data Access Methods

function getAllInfo(url) {

  // get all cids and dates for this url from the distributed db
  // {cid, date}
  let cidsWithDates = await fetchDbInfo(url);

  // loop over cids and get version text
  let versionObjs = [];
  cidsWithDates.forEach(function (cidObj) {
    versionObjs.push({ content: await fetchCidContents(cidObj.cid), date: cidObj.date });
  });

  // build an object to send
  return {
    type: "BACKRES",
    url: url,
    n: versionObjs.length,
    dateLast: versionObjs[versionObjs.length - 1].date,
    testData: versionObjs
  }
}

function getLatestVersion(url) {

  // Lookup url entry in the distributed db
  let cidsWithDates = await fetchDbInfo(url);
  let cid = cidsWithDates[cidsWithDates.length - 1].cid;

  // lookup cid and get text
  return fetchCidContents(cid);
}

function uploadNewVersion(url, text) {

  // upload the text to ipfs and hold on to cid
  let cid = await uploadToIpfs(text);

  // create db entry keyed by this url with version number, date, and [cid] 
  updateDbInfo(url, cid);

}