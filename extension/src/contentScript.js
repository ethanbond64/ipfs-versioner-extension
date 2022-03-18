'use strict';
// require('colors');
const Diff = require('diff');

/////////////// DATA FLOW 1 METHODS /////////////// 

console.log("Content Script is alive");

//// On message from popup.js
// rerender the modal (no confirm button)
// make visible
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SHOWDIFFS') {
    console.log("Data path 1 step 4");
    showModal(request.contents);
  }
  sendResponse({});
  return true;
});

// TODO all thats left is to upload changes if they confirm and update the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'NEWDIFF') {
    console.log("Data path 2 step 2");
    showModal(request.contents);
  }

  // On confirm send response to upload
  // just refresh the page to update the popup
  sendResponse({});
  return true;
});


const showModal = (contents) => {

  fetch(chrome.runtime.getURL('/versionsModal.html')).then(r => r.text()).then(html => {
    // document.
    document.body.insertAdjacentHTML('beforeend', html);

    const dialog = document.getElementById("versionerExtensionModal");
    console.log(dialog);

    // given list of {date, content} generate diffs and display them
    generateVersions(contents);

    dialog.showModal();

    dialog.querySelector("button").addEventListener("click", () => {
      console.log("CLOSE ME")
      dialog.close();
    });
  });

}

function generateVersions(versionObjects) {

  let versionElements = [];

  versionObjects.forEach(function (version, i) {
    let versionTemplate = document.querySelector("#versionTemplate");
    let versionClone = versionTemplate.content.cloneNode(true).querySelector(".versionBlock");

    versionClone.querySelector(".versionDate").innerHTML = version.date;

    // Generate the diff between versions
    if (i == 0) {
      //  ALL new
      let pagragraph = document.createElement("p");
      pagragraph.innerHTML = version.content;
      pagragraph.style.color = "green";

      versionClone.appendChild(pagragraph);
    } else {
      versionClone.appendChild(generateDiffElement(versionObjects[i - 1].content, version.content));
    }

    // versionClone.id = "generatedA"
    document.getElementById("versionContainer").appendChild(versionClone);
    versionElements.push(versionClone);
  });

  versioner(versionElements);
}


// THIS CODE IS FROM THE DIFF MODULE DOCUMENTATION
function generateDiffElement(text_old, text_new) {
  const diff = Diff.diffChars(text_old, text_new)
  const fragment = document.createDocumentFragment();


  diff.forEach((part) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? 'green' :
      part.removed ? 'red' : 'grey';
    let span = document.createElement('span');
    span.style.color = color;
    span.appendChild(document
      .createTextNode(part.value));
    fragment.appendChild(span);
  });

  return fragment;
}

function versioner(versions) {

  console.log(versions);
  const x_change = 30;
  const y_change = 40;


  // Create button
  const btn = document.createElement("button");
  const btnContent = document.createTextNode("Versions");
  btn.appendChild(btnContent);
  btn.style.float = "right";
  // set indexes
  versions.forEach(function (version, i) {
    version.style.zIndex = versions.length - i;
    if (i === 0) {
      // put button on the top one
      version.appendChild(btn);
    }
  });

  btn.onclick = () => {
    // set location
    if (getComputedStyle(versions.at(0)).left == getComputedStyle(versions.at(versions.length - 1)).left) {

      versions.forEach(function (version, i) {
        // Reset order
        version.style.zIndex = versions.length - i;

        version.style.left = (parseInt(getComputedStyle(version).left, 10) + (x_change * (versions.length - (i + 1)))) + "px";
        version.style.top = (parseInt(getComputedStyle(version).top, 10) + (y_change * (versions.length - (i + 1)))) + "px";
      });
    }
  }

  document.addEventListener("click", (event) => {
    let last_version = versions.at(versions.length - 1);

    if (!versions.includes(event.target) && event.target !== btn) {
      versions.forEach(function (version) {
        version.style.left = getComputedStyle(last_version).left;
        version.style.top = getComputedStyle(last_version).top;
      });
    } else if (versions.includes(event.target)) {
      versions.forEach(function (version, i) {

        if (event.target == version) {
          version.appendChild(btn);
          version.style.zIndex = versions.length + 1;
        } else {
          version.style.zIndex = versions.length - i;
        }

        version.style.left = getComputedStyle(last_version).left;
        version.style.top = getComputedStyle(last_version).top;
      });
    }
  });

}

  //// On click off modal
    // hide modal

  //// On diff click
    // bring to front (might be able to do with css idk)

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO