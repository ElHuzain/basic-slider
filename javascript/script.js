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


var articleSwiper = new Swiper(".article-swiper", {
  slidesPerView:  window.innerWidth > 600 ? 4 : 1,
  spaceBetween: 8,
});

window.addEventListener('resize', () => {
  articleSwiper.passedParams.slidesPerView = window.innerWidth > 600 ? 4 : 1;
})


let currentData = 0;
let direction = true; // True = right. False = left

// Pause / play button
const PauseBtn = document.getElementById('pause-play');

// Lottie animation
const lottieAnimation = document.getElementById('lottie-animatino');

// Pause / play logic
let pause = false;

const pausePlay = () => {
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

lottieAnimation.addEventListener('frame', (e) => {
  const currentFrame = e.detail.frame;
  if (currentFrame > 60) {
    swiper.slideNext();
    fillerWidth = 0;
    lottieAnimation.seek(0);
    lottieAnimation.play();
  }
  else if (currentFrame > 50) {
    lottieAnimation.setSpeed(0.3);
  }
  else lottieAnimation.setSpeed(0.8);
});