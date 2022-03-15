'use strict';

/////////////// DATA FLOW 1 METHODS /////////////// 

console.log("Content Script is alive");

//// On message from popup.js
// rerender the modal (no confirm button)
// make visible
chrome.runtime.onMessage.addListener((request) => {
  console.log("Content Script Sees Message");
  if (request.type === 'SHOWDIFFS') {
    console.log("Content Script Sees CORRECT Message");
    showModal();
  }
  sendResponse({});
  return true;
});

const showModal = () => {
  const modal = document.createElement("dialog");
  modal.setAttribute(
    "style", `
height:450px;
border: none;
top:150px;
border-radius:20px;
background-color:white;
position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
`
  );
  modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
<div style="position:absolute; top:0px; left:5px;">
<button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
</div>`;
  document.body.appendChild(modal);
  const dialog = document.querySelector("dialog");
  dialog.showModal();
  const iframe = document.getElementById("popup-content");
  iframe.src = chrome.extension.getURL("index.html");
  iframe.frameBorder = 0;
  dialog.querySelector("button").addEventListener("click", () => {
    dialog.close();
  });
}


  //// On click off modal
    // hide modal

  //// On diff click
    // bring to front (might be able to do with css idk)

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO