$(function() {
    function toggleSubnav() {
        $(this).parent().find('ul').toggleClass('inactive');
        return false;
    };
    $('a[title="Info"]').on('click', toggleSubnav);
    $('a[title="Info"]').on('tap', toggleSubnav);
});