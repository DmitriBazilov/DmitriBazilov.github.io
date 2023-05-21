let tracks = ['audio/track1.mp3', 'audio/track2.mp3'];
let slideIndex = 1;
let currentTrack = 0;
showSlides(slideIndex);
let timerValue = 1;
let timerButton = document.getElementById("change-timer");
let startButton = document.getElementById("start-slide-show")
let intervalId;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function plusTrack(n) {

    currentTrack += n
    if (currentTrack < 0) {
      currentTrack += 2
    }

    showTrack(currentTrack);
}


// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function showTrack(n) {
    let player = document.getElementsByClassName("player");
    player[0].src = tracks[n % 2]
}


function startSlideShow() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startButton.innerText = "start";
        return;
    } else {
        startButton.innerText = "stop";
    }

    intervalId = setInterval(function () {
        plusSlides(1)
    }, 1000 * timerValue);
}


function changeTime() {
    timerValue++;
    timerValue = timerValue % 4 === 0 ? 1 : timerValue

    timerButton.innerText = timerValue + ' sec';

    if (intervalId) {

        clearInterval(intervalId);
        intervalId = setInterval(function () {
            plusSlides(1)
        }, 1000 * timerValue);
    }
}

timerButton.onclick = changeTime;