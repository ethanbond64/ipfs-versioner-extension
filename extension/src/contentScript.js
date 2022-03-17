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
  const modal = document.createElement("dialog");
  modal.setAttribute(
    "style", `
height:80%;
width: 80%;
border: none;
border-radius:10px;
background-color:white;
position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
`
  );
  modal.innerHTML = `
<div style="position:absolute; top:0px; left:5px;">
  <button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
  <div style="margin:10px;">${content}</div>
</div>`;
  document.body.appendChild(modal);
  const dialog = document.querySelector("dialog");
  dialog.showModal();

  dialog.querySelector("button").addEventListener("click", () => {
    console.log("CLOSE ME")
    dialog.close();
  });
}


  //// On click off modal
    // hide modal

  //// On diff click
    // bring to front (might be able to do with css idk)

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO