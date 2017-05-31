$(function() {

    var lim = 5;

    function onAnchorClick(event) {
        chrome.tabs.create({
            selected: true,
            url: event.srcElement.href
        });
        return false;
    }

    chrome.storage.sync.get(['hist', 'limit'], function(history) {
        if (history.limit) {
            $('#limitp').text(history.limit);
            lim = parseInt(history.limit);
        } else
            $('#limitp').text("10");
        if (history.hist) {
            var ul = document.createElement('ul');
            $("#links").append(ul);
            for (var i = 0; i < lim; i++) {
                var a = document.createElement('a');
                a.href = history.hist[i];
                a.appendChild(document.createTextNode(history.hist[i]));
                a.addEventListener('click', onAnchorClick);
                var li = document.createElement('li');
                li.appendChild(a);
                ul.appendChild(li);
            }
        }
    });

});