/**
 *To include js file from libraries write: `//= include ./path-to-file`
 * */

//= include ../lib/jquery-3.3.1.min.js
//= include ../lib/micromodal.js



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

    $('.btn-close, .backdrop').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });


    /**
     * SLIDER BANNER SCRIPT
     **/

    var bannerSlider = new Swiper('.slider-banner', {
        loop: true,
        slidePreview: 1,
    });

    /**
     * Prepare swiper slides
     **/
    var prepareSlides = function (arrUrls) {
        return arrUrls.map(function (imgUrl) {
            return (
                '<div class="swiper-slide"><img class="gallery-modal__img" src="' + imgUrl + '"/></div>'
            )
        });
    };

    /**
     *MODAL SCRIPT
     **/

    var categoriesPhotos = {
        coupes: [
            'https://obyava.ua/img/classified/0/159/4509/g62i512cisq1qr5z.jpg',
            'https://happyhata.com.ua/content/images/8/28451399808524_small11.jpeg',
            'https://dobralavka.ua/image/catalog/03-19/shkafi-kupe/shkafi-kupe-s-zerkalom2.jpg',
            'https://images.ua.prom.st/1692474894_dveri-razdvizhnye-dlya.jpg',
        ],
        walls: [
            'http://berkem.ru/wp-content/uploads/2017/07/zerkalo-v-koridore-590x442.jpg',
            'https://e-plitka.com/wa-data/public/shop/products/71/83/38371/images/98570/98570.970.jpg',
            'https://otdelka-expert.ru/wp-content/uploads/2016/12/na-foto-my-vidim-zerkalo-na-stenu-v-prihozhuyu.jpg',
        ],
        doors: [
            'https://i.pinimg.com/originals/19/61/fb/1961fbec40907c9f835e05a3a7cfe633.jpg',
            'https://ru.all.biz/img/ru/catalog/914428.jpeg',
            'https://ua.all.biz/img/ua/catalog/1298214.jpeg',
        ],
        vitrage: [
            'https://lh3.googleusercontent.com/proxy/LvyLNxSuOw1LDnfG07oFu_XASYRiP3RjraywVCrGk_Xld7N_18bHvyTpADZC12IZdz2zAY9TphVCGbx53LloD_0ThLPDdNGO2JAATbDWtOTfW-hOdwiq4BbV4vCFwOSD322m-A',
            'https://lh4.googleusercontent.com/proxy/hiRi-Ql58bBywOrIo8nyClN2dywByvelEHppWOoHDG0x77FuPr6rzh8ogmAQXcH9jvSXP-5C3_pM7lGC7x6_eJ8uAvIrzPPW',
            'https://lh3.googleusercontent.com/proxy/qswMKkfsL5ApXhW_WSQRC6SPeJ1gTaZIfCPzOvgwLncNmCP1swQjmvgSHPVQwPGzuril45zeT3l8vPRONQs40fIcjSxhxZYVH98',
        ],
        tables: [
            'https://www.dybok.com.ua/images/8926/mainimg/GD-082-1_big.jpg',
            'https://stroiremdoma.ru/images/stroiremdoma/2016/12/1-2.jpg',
        ],
        typeGlass: [
            'https://lh3.googleusercontent.com/proxy/Ryw5s0t1YLcc7MyA8881EOghkTHLrxzdVotwO8iKc0S4HL91AQRJOwFnWdbzkN--V6oFgJm1v61miEDm8z12fj_ZmSA_TALrMhd8t4M3ABZtESzt309iE7rN1FcNrLQm5Xp-kb4a',
            'https://stroiremdoma.ru/images/stroiremdoma/2015/12/tovar-big2.jpg',
            'https://bouw.ru/userfiles/476_22.jpg',
        ]
    };

    var gallerySlider;
    console.log(MicroModal)

    var galleryModal = MicroModal.init({
        disableScroll: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,

        onShow: function (modal, trigger) {
            var slides = prepareSlides(categoriesPhotos[trigger.id] || []);
            gallerySlider = new Swiper('#gallery-slider', {
                speed: 800,
                spaceBetween: 30,
                // loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
            gallerySlider.appendSlide(slides);
        },
        onClose: function () {
            gallerySlider.destroy(true, true);
            $('#gallery-slider .swiper-wrapper').empty();
        }
    });
});