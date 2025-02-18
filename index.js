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

function test() {
    window.dataLayer.push({
        "ecommerce": {
            "currencyCode": "RUB",
            "impressions": [
                {
                    "id": "P15432",
                    "name" : "Футболка",
                    "price": 477.60,
                    "brand": "Яндекс / Яndex",
                    "category": "Одежда/Мужская одежда/Футболки",
                    "variant" : "Красный цвет",
                    "list": "Search",
                    "position": 1
                }
            ]
        }
    });
    console.log("datalayer push");
    console.log(window.dataLayer);
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
    console.log(timerValue);
    dataLayer.push({
        "ecommerce": {
            "currencyCode": "RUB",    
            "add": {
                "products": [
                    {
                        "id": "43521",
                        "name": "Сумка Яндекс",
                        "price": 654.32,
                        "brand": "Яндекс / Яndex",
                        "category": "Аксессуары/Сумки",
                        "quantity": 1,
                        "list": "Выдача категории",
                        "position": 2
                    }
                ]
            }
        }
    });
    console.log("test");
}

timerButton.onclick = changeTime;

window.onload = function () {
  let audio = document.getElementById("audio1");
  let context = null

    // Используем метод push для добавления Ecommerce-объекта
    window.dataLayer.push(
        // Ecommerce-объект
        {
           "ecommerce": {
                "currencyCode": "RUB",
                "purchase": {
                    "actionField": {
                        "id" : "TRX987"
                    },
                    "products": [
                        {
                            "id": "25341",
                            "name": "Толстовка Яндекс мужская",
                            "price": 1345.26,
                            "brand": "Яндекс / Яndex",
                            "category": "Одежда/Мужская одежда/Толстовки и свитшоты",
                            "variant": "Оранжевый цвет",
                            "quantity": 1,
                            "list": "Одежда",
                            "position": 1
                        },
                        {
                            "id": "25314",
                            "name": "Толстовка Яндекс женская",
                            "price": 1543.62,
                            "brand": "Яндекс / Яndex",
                            "category": "Одежда/Женская одежда/Толстовки и свитшоты",
                            "variant": "Белый цвет",
                            "quantity": 3,
                            "list": "Толстовки",
                            "position": 2
                        }
                    ]
                }
            }
        }
    );

  audio.onplay = function () {
    if (context) {
      return
    }
    context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    let analyser = context.createAnalyser();

    let canvas = document.getElementById("visual");
    canvas.width = audio.clientWidth;
    canvas.height = audio.clientHeight;

    let ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 512;

    let bufferLength = analyser.frequencyBinCount;

    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);


      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 5;


        let r = 0;
        let g = 0;
        let b = 0;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};
