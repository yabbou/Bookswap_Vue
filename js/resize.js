$(document).ready(function () {
    $(window).on('resize', function resize(FOOTER_RISES_SCREEN_SIZE) {
        if ($(window).width() >= FOOTER_RISES_SCREEN_SIZE) {
            $('footer').css('position', 'absolute');
        } else {
            $('footer').css('position', 'relative');
        }
    }).resize();
});