import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/accordion';
import 'jquery-ui/ui/widgets/tabs';
import 'bootstrap';
import 'popper.js';
import "select2";
import intlTelInput from 'intl-tel-input';
import Parallax from "parallax-js";
import Swiper from 'swiper/dist/js/swiper.min';

$(window).on('load', function () {
    let b = $('body');
    let pw = $('.preload-wrapper');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    pw.fadeOut(300);

    $('.header__navigation-burger').on('click', function() {
        $(this).toggleClass('header__navigation-burger_active');
        $(this).next().toggleClass('header__navigation-list_open');
    });
});

// animate scroll
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('nav a[href^="#"]:not([href="#"])');

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            } else {
                return;
            }
        });
    });
});

$(function () {
    // Swiper slider
    if ($('.swiper-container').length) {
        let slider;
        let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

        if (slide > 1) {
            slider = new Swiper('.swiper-container', {
                observer: true,
                observeParents: true,
                loop: true,
                autoplay: true,
                spaceBetween: 40,
                slidesPerView: 2,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    // dynamicBullets: true,
                    clickable: true
                },
                /*scrollbar: {
                    el: '.swiper-scrollbar',
                },*/
            });
        }
    }

    // ParallaxJS
    if ($('#scene').length) {
        const scene = document.getElementById('scene');
        const parallaxInstance = new Parallax(scene);
    }

    // Tabs
    if ($('#tabs').length) {
        $('#tabs').tabs({
            show: {
                effect: 'fadeIn',
                duration: 300,
            },
            hide: {
                effect: 'fadeOut',
                duration: 300,
            },
        });
    }

    // Select2
    if ($('.select2').length) {
        let selectStyled = $('.select2');
        selectStyled.select2({
            minimumResultsForSearch: Infinity,
            // dropdownParent: $('.dropdown-wrapper'),
        });
    }

    // Accordion
    if ($('.faq-section__block').length) {
        const faqBox = $('.faq-section__block');

        faqBox.each((i, el) => {
            if ($(el).hasClass('active')) {
                $(el).find('.faq-section__block-body').slideDown()
            } else {
                $(el).find('.faq-section__block-body').slideUp()
            }
        });

        const faqToggler = $('.faq-section__block-head');

        faqToggler.on('click', function () {
            $(this).parent().toggleClass('active');
            $(this).next('.faq-section__block-body').stop().slideToggle(300);
        });
    }

    // intl-tel-input
    if ($('#phone').length) {
        let input = document.querySelector("#phone");
        let iti = intlTelInput(input, {
            separateDialCode: true,
            utilsScript: "../../node_modules/intl-tel-input/build/js/utils.js",
            initialCountry: "in",
        });

        // Обработчик события изменения страны
        iti.promise.then(function () {
            $("#countryCode").val(iti.getSelectedCountryData().dialCode);
        });

        // Обработчик события изменения телефонного номера
        input.addEventListener("change", function () {
            $("#countryCode").val(iti.getSelectedCountryData().dialCode);
        });
    }

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});