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
    document.getElementById("thisUrl").innerHTML = url;
  }

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO

})();