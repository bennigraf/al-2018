$(function() {
    function toggleSubnav() {
        $(this).parent().find('ul').toggleClass('inactive');
        return false;
    };
    $('a[title="Info"]').on('click', toggleSubnav);
});