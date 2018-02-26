$(function() {
    function toggleSubnav() {
        var parent = $(this).parent();
        var wasActive = !parent.find('ul').hasClass('inactive');
        parent.parent().find('li > ul').addClass('inactive');
        if (!wasActive) {
            parent.find('ul').removeClass('inactive');
        }
        return false;
    };
    $('a[title="Info"], a[title="Rückblick"]').on('click', toggleSubnav);

    // activate overlay on click (for mobile)

    // ToDo: Mobile detects both tap and click on the link (thus opens the link with the default 
    //      click action). Find a way to only `.hover` on mobile and keep default functionality
    //      (:hover) on desktop!
    $('.a-band').on('click', function() {
        console.log("clickclick");
        return false;
    });
    $('.a-band').on('tap', function() {
        console.log("taptap");
        if (!$(this).hasClass('hover')) {
          $(this).addClass('hover');
        } else {
        //   var address = $(this).find('a').attr('href');
        //   window.open(address, '_blank');
        }
      });
});