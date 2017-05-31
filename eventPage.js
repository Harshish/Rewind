$(function() {

    var urls = [];
    var lim = 5;

    chrome.storage.sync.get('limit', function(history) {
        if (history.limit)
            lim = parseInt(history.limit);
    });

    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {

        chrome.storage.sync.get('limit', function(history) {
            if (history.limit)
                lim = parseInt(history.limit);
        });

        chrome.history.search({ 'text': '' }, function(historyItems) {
            for (var i = 0; i < lim; i++)
                urls[i] = historyItems[i].url
        });

        chrome.storage.sync.set({ 'hist': urls }, function() {
            //blank
        });

    });

    chrome.tabs.onCreated.addListener(function(tab) {


        chrome.storage.sync.get('limit', function(history) {
            if (history.limit)
                lim = parseInt(history.limit);
        });

        chrome.history.search({ 'text': '' }, function(historyItems) {
            for (var i = 0; i < lim; i++)
                urls[i] = historyItems[i].url
        });
        chrome.storage.sync.set({ 'hist': urls }, function() {
            //blank
        });
    });

});