// console.log("Background");
// TODO
// IF NOT YET TRACKED
// Provide entrypoint to diff and upload api
// IF TRACKED 
// Compare to last version, if different upload the changes through the api (TODO)
// Load versions into page if they exist
// Diff view can be handled here, but would be best to do most of that with css

// searchUrbanDict = function (word) {
//     var query = word.selectionText;
//     chrome.tabs.create({ url: "http://www.urbandictionary.com/define.php?term=" + query });
// };

// chrome.contextMenus.create({
//     title: "Search in UrbanDictionary",
//     contexts: ["selection"],  // ContextType
//     onclick: searchUrbanDict
// });


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "sample context action",
        title: "Save Version",
        type: 'normal',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(
    (info) => {
        chrome.tabs.create({
            url: "http://www.urbandictionary.com/define.php?term=" + encodeURIComponent(info.selectionText)
        });
    });