var swiper = new Swiper(".main-swiper", {
    effect: "fade",
    // speed: 1,
    loop: true,
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
});