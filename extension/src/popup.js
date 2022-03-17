'use strict';

import './popup.css';

(function () {

  /////////////// DATA FLOW 1 METHODS ///////////////

  //// On localstorage change tab
  // message the background page for info
  window.addEventListener('DOMContentLoaded', () => {
    console.log("Data Path 1 Step 1");
    // message background js for the ipfs info
    chrome.runtime.sendMessage(
      {
        type: 'POPUPREQ',
        payload: {
          message: `Search cache/ipfs for url details`
        },
      },
      (response) => {
        console.log("Data Path 1 Step 2 Recieved", response.url);
        setURLField(response.url);
      });
  });

  const setURLField = (url) => {

    let urlParts = url.split('/');
    let cleanurl = urlParts[0] + '//' + urlParts[2];

    document.getElementById("thisUrl").innerHTML = cleanurl;
  }



  //// On click - button
  // send message to content to show the modal
  document.getElementById('versionShower').addEventListener('click', () => {
    console.log("Data path 1 step 3");
    // chrome.runtime.sendMessage(
    //   {
    //     type: 'POPUPSEARCH',
    //     payload: {
    //       message: `Search cache/ipfs for url details`
    //     },
    //   }, (response) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'SHOWDIFFS',
          payload: {
            diffs: "YOOO",
          },
        },
        response => {
          console.log('content script responded');
        });
    });
    // }
    // );
  });
  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO

})();