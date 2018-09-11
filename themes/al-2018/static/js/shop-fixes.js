console.log('setting up loader'); // ...manually to be aware of when it was loaded
function prefixScript(url, onloadFunction) {
  var newScript = document.createElement("script");
  if (onloadFunction) { newScript.onload = onloadFunction; }
  document.currentScript.parentNode.insertBefore(newScript, document.currentScript);
  newScript.src = url;
}
prefixScript('https://shop.alinaelumr.de/widget/v1.de-informal.js', function() {
    console.log('loaded');
    var totaltries = 0;
    function waitForWidgetLoader() {
        var widgets = document.querySelectorAll("div.pretix-widget-wrapper");
        if (widgets.length === 0) {
            totaltries++;
            if (totaltries < 200) {
                setTimeout(waitForWidgetLoader, 33);
            } else {
                console.log('timing out');
            }
        } else {
            onWidgetLoad(widgets[0]);
        }
    };
    waitForWidgetLoader();
});

function onWidgetLoad(widget) {
    console.log('fix useIframe');
    widget.__vue__.$root._computedWatchers.useIframe.get = function() { return false };
    console.log(widget.__vue__.$root.useIframe);

    $('.pretix-widget form').each(function(index, item) {
        $(item).removeAttr('target');
    });
}
