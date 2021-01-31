$(document).ready(function () {
    $(window).on('resize', function () {
        carouselResize();
        $('footer').css('position', 'relative');
    }).resize();
});

function carouselResize() {
    var APPROX_DIVISOR = 300;
    $('.jcarousel').slick({
        slidesToShow: Math.floor($(window).width() / APPROX_DIVISOR),
        infinite: false,
        slidesToScroll: 1,
        dots: true
    });
}