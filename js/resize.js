function relativeFooterWidthGreaterThan(FOOTER_RISES_SCREEN_SIZE) {
    var position = $(window).width() >= FOOTER_RISES_SCREEN_SIZE ? 'relative' : 'absolute';
    $('footer').css('position', position);
}

function relativeFooterWidthLessThan(FOOTER_RISES_SCREEN_SIZE) {
    var position = $(window).width() <= FOOTER_RISES_SCREEN_SIZE ? 'relative' : 'absolute';
    $('footer').css('position', position);
}

function relativeFooterHeightGreaterThan(FOOTER_RISES_SCREEN_SIZE) {
    $('footer').css('position',
        $(window).height() >= FOOTER_RISES_SCREEN_SIZE ? 'relative' : 'absolute'
    );
}

function relativeFooterHeightLessThan(FOOTER_RISES_SCREEN_SIZE) {
    $('footer').css('position',
        $(window).height() <= FOOTER_RISES_SCREEN_SIZE ? 'relative' : 'absolute'
    );
}