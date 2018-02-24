$(function() {
    function toggleSubnav() {
        $(this).parent().find('ul').toggleClass('inactive');
        return false;
    };
    $('a[title="Info"]').on('click', toggleSubnav);

    // activate overlay on click (for mobile)
    $('.a-band').on('tap', function() {
        if (!$(this).hasClass('hover')) {
          $(this).addClass('hover');
        } else {
          var address = $(this).find('a').attr('href');
          window.open(address, '_blank');
        }
      });
});