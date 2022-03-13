'use strict';

  /////////////// DATA FLOW 1 METHODS /////////////// 

  //// On changeTab 
  // ask backgroud for ipfs info, to send to popup
// chrome.tabs.onActivated.addListener((activeInfo) => {
//   console.log("content: tab changed, send to background");
//   // console.log(activeInfo.tabId);
//   chrome.runtime.sendMessage(
//     {
//       type: 'CTOB',
//       payload: {
//         tabId: activeInfo.tabId,
//         url: activeInfo.url
//       },
//     },
//     response => {
//       console.log(response.message);
//     }
//   );
// });

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   console.log("content: tab changed");
// });
  // On message from popup.js
    // rerender the modal (no confirm button)
    // make visible
  
  // On click off modal
    // hide modal

  // On diff click
    // bring to front (might be able to do with css idk) 

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO