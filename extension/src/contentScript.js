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

    const one = 'beep boop';
    const other = 'beep boob blah';

    const diff = Diff.diffChars(one, other),
      fragment = document.createDocumentFragment();


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

    const dContent = document.getElementById("versionerExtensionContent");
    dContent.appendChild(fragment)

    const dialog = document.getElementById("versionerExtensionModal");
    console.log(dialog);

    // given list of {date, content} generate diffs and display them
    let testVersionObjs = [{ content: "A Content", date: "A Date" }, { content: "B Content", date: "B Date" }, { content: "C Content", date: "C Date" }]
    // let els = [];
    generateVersions(testVersionObjs);

    dialog.showModal();

    dialog.querySelector("button").addEventListener("click", () => {
      console.log("CLOSE ME")
      dialog.close();
    });
  });

}

function generateVersions(versionObjects) {

  let versionElements = [];

  versionObjects.forEach(function (version) {
    let versionTemplate = document.querySelector("#versionTemplate");
    let versionClone = versionTemplate.content.cloneNode(true).querySelector(".versionBlock");
    versionClone.querySelector(".versionDate").innerHTML = version.date;

    // versionClone.id = "generatedA"
    document.getElementById("versionContainer").appendChild(versionClone);
    versionElements.push(versionClone);
  });

  versioner(versionElements);
}


// function generateDiffElement(text) {
// TODO
// }

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