$(function() {

    chrome.storage.sync.get('limit', function(history) {
        if (history.limit)
            $('#limit').val(history.limit);
        else
            $("#limit").val(10);
    });

    $('#saveLimit').click(function() {
        var limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({ 'limit': limit }, function() {
                var lim = parseInt(limit);
                var urls = [];
                chrome.history.search({ 'text': '' }, function(historyItems) {
                    for (var i = 0; i < lim; i++)
                        urls[i] = historyItems[i].url
                });
                chrome.storage.sync.set({ 'hist': urls }, function() {
                    //blank
                });
                close();
            });
        }
    });
});