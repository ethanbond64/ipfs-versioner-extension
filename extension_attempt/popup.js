


$(document).ready(function () {
    console.log("logged from popup js");
    $("#versioner").on("click", handleText);

    async function handleText() {
        let text = await getText();
        console.log(text);
    }

});

//
// get the text that is current selected
//
async function getText() {
    let returnText = "";
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    var scriptInjection = {
        target: { tabId: tab.id },
        func: injectionFunction
    };

    chrome.scripting.executeScript(
        scriptInjection,
        (sel) => { returnText = sel[0].result }
    );
    return returnText;
}

const injectionFunction = () => { return window.getSelection().toString() };

// function getCurrentTab() {

//     return chrome.tabs.query(query, tabCallback);
// }

// function tabCallback(tabs) {
//     console.log("tab id: " + tabs[0].id);
//     return tabs[0].id;
// }
