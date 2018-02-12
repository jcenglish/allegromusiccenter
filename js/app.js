// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
//$(document).foundation();

$(document).ready(function () {
    $('.slideshow').slick({
        adaptiveHeight: true,
        autoplay: true,
        accessibility: true,
        autoplaySpeed: 5000,
        arrows: true,
        dots: true,
        draggable: true,
        infinite: true,
        mobileFirst: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        speed: 1600,
        swipe: true
    });
});
