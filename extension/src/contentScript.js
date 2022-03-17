'use strict';

/////////////// DATA FLOW 1 METHODS /////////////// 

console.log("Content Script is alive");

//// On message from popup.js
// rerender the modal (no confirm button)
// make visible
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SHOWDIFFS') {
    console.log("Data path 1 step 4");
    showModal("DIFFS GO HERE");
  }
  sendResponse({});
  return true;
});

// TODO all thats left is to upload changes if they confirm and update the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'NEWDIFF') {
    console.log("Data path 2 step 2");
    showModal(request.content);
  }

  // On confirm send response to upload
  // just refresh the page to update the popup
  sendResponse({});
  return true;
});




const showModal = (content) => {

  fetch(chrome.runtime.getURL('/versionsModal.html')).then(r => r.text()).then(html => {
    // document.
    document.body.insertAdjacentHTML('beforeend', html);
    // not using innerHTML as it would break js event listeners of the page

    const dialog = document.getElementById("versionerExtensionModal");
    console.log(dialog);
    dialog.showModal();

    dialog.querySelector("button").addEventListener("click", () => {
      console.log("CLOSE ME")
      dialog.close();
    });
  });

}

  //// On click off modal
    // hide modal

  //// On diff click
    // bring to front (might be able to do with css idk)

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO