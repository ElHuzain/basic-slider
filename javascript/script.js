let swiper, articleSwiper, PauseBtn, lottieAnimation, ClickableArrows, htmlElement, isRTL, ArticleSwiperContainer, MainSwiperContainer, copyOfMainSwiperElement, copyOfArticleSwiperElement, MainSwiperElement, ArticleSwiperElement;

function reInitialize() {
  MainSwiperContainer.removeChild(MainSwiperElement);
  MainSwiperContainer.appendChild(copyOfMainSwiperElement.cloneNode(true));

  ArticleSwiperContainer.removeChild(ArticleSwiperElement);
  ArticleSwiperContainer.appendChild(copyOfArticleSwiperElement.cloneNode(true));

  initSwiper();
  initialize();
}

function initialize() {
  // Preparing a copy of swipers
  MainSwiperContainer = document.getElementById('main-swiper-container');
  MainSwiperElement = document.getElementById('main-swiper-element');
  copyOfMainSwiperElement = MainSwiperElement.cloneNode(true);

  ArticleSwiperContainer = document.getElementById('article-swiper-container');
  ArticleSwiperElement = document.getElementById('article-swiper-element');
  copyOfArticleSwiperElement = ArticleSwiperElement.cloneNode(true);

  // Main Slider Initialization
  swiper = new Swiper(".main-swiper", {
    effect: "fade",
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

  // Article Slider Initialization
  articleSwiper = new Swiper(".article-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 8,
    freeMode: true,
  });

  // Pause / play button
  PauseBtn = document.getElementById('pause-play');

  // Lottie animation
  lottieAnimation = document.getElementById('lottie-animatino');

  // Clickable arrows
  ClickableArrows = document.getElementsByClassName('clikable-arrow');

  // Reversing arrows in case of RTL layout
  htmlElement = document.getElementsByTagName('html')[0];
  isRTL = htmlElement.attributes[0].value === 'rtl';

  if (isRTL) {
    for (let i = 0; i < ClickableArrows.length; i++) {
      ClickableArrows[i].style.transform = 'rotate(180deg)'
    }
  }


  // Pause / play logic
  pause = false;

  pausePlay = () => {
    if (pause) {
      PauseBtn.classList.add('fa-pause');
      PauseBtn.classList.remove('fa-play');
      lottieAnimation.play();
    } else {
      PauseBtn.classList.remove('fa-pause');
      PauseBtn.classList.add('fa-play');
      lottieAnimation.pause();
    }
    pause = !pause;
  }


  resetAnimation = () => {
    swiper.slideNext();
    lottieAnimation.seek(0);
    lottieAnimation.play();
    lottieAnimation.setSpeed(0.8);
  }

  lottieAnimation.addEventListener('frame', (e) => {
    const currentFrame = e.detail.frame;

    if (currentFrame > 65) resetAnimation();

  });
}

initialize();

function toRTL() {
  const isRTL = document.getElementsByTagName('html')[0].attributes[0].value === 'rtl'

  const htmlElement = document.getElementsByTagName('html')[0]
  if (isRTL) htmlElement.setAttribute('dir', 'ltr');
  else htmlElement.setAttribute('dir', 'rtl');
}


// Listening for attribute changes
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes") {
      reInitialize();
    }
  });
});

observer.observe(htmlElement, {
  attributes: true //configure it to listen to attribute changes
});