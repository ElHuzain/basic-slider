
// Main Slider Initialization
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

// Article Slider Initialization
var articleSwiper = new Swiper(".article-swiper", {
  slidesPerView: 'auto',
  spaceBetween: 8,
  freeMode: true,
});

// Pause / play button
const PauseBtn = document.getElementById('pause-play');

// Lottie animation
const lottieAnimation = document.getElementById('lottie-animatino');

// Clickable arrows
const ClickableArrows = document.getElementsByClassName('clikable-arrow');

// Reversing arrows in case of RTL layout
const isRTL = document.getElementsByTagName('html')[0].attributes[0].value === 'rtl'

if(isRTL) {
  for(let i = 0; i < ClickableArrows.length; i++) {
    ClickableArrows[i].style.transform = 'rotate(180deg)'
  }
}

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


const resetAnimation = () => {
  swiper.slideNext();
  lottieAnimation.seek(0);
  lottieAnimation.play();
  lottieAnimation.setSpeed(0.8);
}

lottieAnimation.addEventListener('frame', (e) => {
  const currentFrame = e.detail.frame;

  if (currentFrame > 65) resetAnimation(); 

});