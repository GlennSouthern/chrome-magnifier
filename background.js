chrome.browserAction.onClicked.addListener(function (tabs) {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action:'click'});
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.tabs.captureVisibleTab(
        null,
        {}, 
        function(dataUrl) {
            sendResponse({imgSrc:dataUrl});
        }
    );
    return true;
});