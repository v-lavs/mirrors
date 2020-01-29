/**
 *To include js file from libraries write: `//= include ./path-to-file`
 * */

//= include ../lib/jquery-3.3.1.min.js
//= include ../lib/owl-slider/js/build.js


/**
 * CUSTOM SCRIPTS
 **/

$(document).ready(function () {

    var nav = $('.main-nav');

    /**
     * MOB MENU SCRIPT
     **/

    $('.burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.close-nav, .backdrop').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });


    /**
     * OWL-CAROUSEL SCRIPT
     **/
    jQuery(".slider-banner").owlCarousel({
        items: 1,
        pagination: false,
        dots: false,
        nav: true,
        slideSpeed: 2000,
        margin: 0,

    });

});