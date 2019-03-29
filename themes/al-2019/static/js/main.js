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

    // activate overlay on click
    $('.a-band').on('click', function() {
        if (!$(this).hasClass('hover')) {
            $(this).addClass('hover');
            return false;
        }
    });
});