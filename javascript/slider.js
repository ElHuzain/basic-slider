// Assuming that this is data coming from an API.
const data = [
    {
        id: 1,
        title: 'Real Estate Knowledge Bank',
        subtitle: 'Want to press your broker exam in first attempt? Want to stand out from the croud? Then download this valuable resource which contains Q & A\'s, real estate concepts, propery management, best practices and many more...',
        cta: 'Register to Download',
        img: './assets/image-1.jpeg'
    },
    {
        id: 1,
        title: 'Noqodi Payment Support',
        subtitle: 'For Noqodi Support, please complete the form available at the link below.',
        cta: 'Application Form',
        img: './assets/image-2.jpg'
    },
    {
        id: 1,
        title: 'Login via UAE PASS Only',
        subtitle: 'Starting 1st January 2024, you will need to login to the following systems via UAE PASS only Oqood, Registration Trustee, Property Trustee, Ejari, Trakheesi and Mollak.',
        cta: 'How to Register?',
        img: './assets/image-3.jpg'
    },
]

let currentData = 0;
let direction = true; // True = right. False = left

// Container. I called it "draggable" since I'll add a dragging handler
const draggable = document.getElementById('draggable');

// Elements that will change and animate based on the slider
const imageDisplay = document.getElementById('image-display');
const headerText = document.getElementById('header-text');
const subHeaderText = document.getElementById('sub-header');
const callToActionButton = document.getElementsByClassName('call-to-action');
const listOfPoints = document.getElementsByClassName('point');

// Swiping buttons
const swipeButtons = document.getElementsByClassName('swipe-button');

// Pause / play button
const PauseBtn = document.getElementById('pause-play');

// Lottie animation
const lottieAnimation = document.getElementById('lottie-animatino');

const init = () => {
    update();
}

// Swiping functinos
const swipeLeft = () => {
    if (currentData === 0) return;
    direction = false;
    currentData--;
    update();
}

const swipeRight = () => {
    if (currentData === data.length - 1) return;
    direction = true;
    currentData++;
    update();
}

const setSwipe = (index) => {
    currentData = index;
    update();
}


const update = () => {
    const currentObject = data[currentData];

    imageDisplay.src = currentObject.img;
    headerText.innerHTML = currentObject.title;
    subHeaderText.innerHTML = currentObject.subtitle;
    callToActionButton[0].innerHTML = currentObject.cta;
    callToActionButton[1].innerHTML = currentObject.cta;

    resetAnimation(
        [
            { element: headerText, duration: .2 },
            { element: subHeaderText, duration: .3 },
            { element: callToActionButton[0], duration: .4 },
            { element: callToActionButton[1], duration: .4 },
            { element: imageDisplay, duration: .5 }
        ]);

    for (let i = 0; i < listOfPoints.length; i++) {
        console.log(listOfPoints[i])
        if (i === currentData) changeColor(listOfPoints[i], 'point-color-inactive', 'point-color-active');
        else changeColor(listOfPoints[i], 'point-color-active', 'point-color-inactive')
    }

    // Fade out buttons that are locked due to swipping limit
    changeColor(swipeButtons[0], 'button-color-inactive', 'button-color-active')
    changeColor(swipeButtons[1], 'button-color-inactive', 'button-color-active')

    if (currentData === 0) {
        changeColor(swipeButtons[0], 'button-color-active', 'button-color-inactive')
    } else if (currentData === data.length - 1) {
        changeColor(swipeButtons[1], 'button-color-active', 'button-color-inactive')
    }

}

const changeColor = (element, prevClass, newClass) => {
    element.classList.remove(prevClass);
    element.classList.add(newClass);
}

const resetAnimation = (elements) => {

    const animationDirection = direction ? 'fade-left' : 'fade-right'

    elements.forEach(elm => {
        const { element, duration } = elm;
        element.style.setProperty("animation", "unset");
        void element.offsetWidth;
        element.style.setProperty("animation", `${animationDirection} ${duration}s ease-in-out`);
    })
}

// Logic for swipipng right / left

let mouseX = null, mouseY = null;
let dragging = false;

// Laptop swipe handling

draggable.addEventListener('mousedown', (e) => {
    mouseX = e.clientX
})

draggable.addEventListener('mouseup', (e) => {
    if (mouseX < e.clientX - 50) swipeLeft()
    else if (mouseX > e.clientX + 50) swipeRight()
})

// Phone swipe handling

draggable.addEventListener('touchstart', (e) => {
    mouseX = e.touches[0].screenX
    dragging = true;
})

draggable.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    if (mouseX < e.touches[0].screenX - 50) {
        swipeLeft()
        dragging = false;
    }
    else if (mouseX > e.touches[0].screenX + 50) {
        swipeRight()
        dragging = false;
    }
})

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

// I previously used the "complete" listener to reload the animation, but I realized I can just do it in the frame listener since I'll be using it anyways
// This listener is implemented to slow down the animation at the end (because the first half is slow, second half is very fast)
lottieAnimation.addEventListener('frame', (e) => {
    const currentFrame = e.detail.frame;
    if (currentFrame > 60) {
        if (currentData === data.length - 1) setSwipe(0);
        else swipeRight()
        fillerWidth = 0;
        lottieAnimation.seek(0);
        lottieAnimation.play();
    }
    else if (currentFrame > 50) {
        lottieAnimation.setSpeed(0.3);
    }
    else lottieAnimation.setSpeed(0.8);
});

init();