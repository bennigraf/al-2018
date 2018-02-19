$(function() {
    $('a[title="Info"]').on('click', function(e) {
        $(this).parent().find('ul').toggleClass('inactive');
        return false;
    })
});