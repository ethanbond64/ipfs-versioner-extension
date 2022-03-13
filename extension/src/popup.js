'use strict';

import './popup.css';

(function () {

  // currentUrl = "";



  window.onload = function () {
    console.log("onload" + Date())
  }

  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const counterStorage = {
    get: cb => {
      chrome.storage.sync.get(['count'], result => {
        cb(result.count);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          count: value,
        },
        () => {
          cb();
        }
      );
    },
  };

  function setupCounter(initialValue = 0) {
    document.getElementById('counter').innerHTML = initialValue;

    document.getElementById('incrementBtn').addEventListener('click', () => {
      updateCounter({
        type: 'INCREMENT',
      });
    });

    document.getElementById('decrementBtn').addEventListener('click', () => {
      updateCounter({
        type: 'DECREMENT',
      });
    });
  }

  function updateCounter({ type }) {
    counterStorage.get(count => {
      let newCount;

      if (type === 'INCREMENT') {
        newCount = count + 1;
      } else if (type === 'DECREMENT') {
        newCount = count - 1;
      } else {
        newCount = count;
      }

      counterStorage.set(newCount, () => {
        document.getElementById('counter').innerHTML = newCount;

        // Communicate with content script of
        // active tab by sending a message
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          const tab = tabs[0];

          chrome.tabs.sendMessage(
            tab.id,
            {
              type: 'COUNT',
              payload: {
                count: newCount,
              },
            },
            response => {
              console.log('Current count value passed to contentScript file');
            }
          );
        });
      });
    });
  }

  function restoreCounter() {
    // Restore count value
    counterStorage.get(count => {
      if (typeof count === 'undefined') {
        // Set counter value as 0
        counterStorage.set(0, () => {
          setupCounter(0);
        });
      } else {
        setupCounter(count);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreCounter);

  /////////////// DATA FLOW 1 METHODS /////////////// 

  //// On localstorage change tab 
  // rerender popup page
  // chrome.storage.sync.onChanged.addListener(console.log.bind(console));
  // // chrome.storage.local.onChanged.addListener((changes, areaName) => {
  // //   console.log("Changes seen in popup: ", changes);
  // //   // Do whatever you want with the changes.
  // // });

  // chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  //   console.log("Popup: tab changed");
  // });

  //// On click "view versions"
  // fetch each version, and store in a json obj {versions:[{date:"",diff:""}]
  // send message to content.js with versions

  /////////////// DATA FLOW 2 METHODS ///////////////

  // TODO

})();

// USE THIS!!!!!!
window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    console.log("Popup: tab changed", tab.id);
    // TODO message background js for the ipfs info
    // Communicate with background file by sending a message
    chrome.runtime.sendMessage(
      {
        type: 'REQ',
        payload: {
          message: `YOOO go to ipfs ${tab.id}`,
          eyed: tab.id
        },
      },
      (response) => {
        // WHY DOES THIS COMEUP UNDEFINED?
        console.log(response);
      }
    );
  });
});
