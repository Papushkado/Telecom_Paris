var slidesData;
var currentIndex = 0;
var isPlaying = false;
var timer;

document.addEventListener("DOMContentLoaded", function () {
    loadSlides();
    setupButtons();
});

function loadSlides() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            slidesData = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "slides.json", true);
    xhr.send();
}

function renderSlide(index) {
    var container = document.getElementById("container");
    container.innerHTML = "";

    var iframe = document.createElement("iframe");
    iframe.src = slidesData.slides[index].url;
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    container.appendChild(iframe);

    if (isPlaying) {
        timer = setTimeout(function () {
            nextSlide();
        }, slidesData.slides[index].time * 1000);
    }
}

function playSlideshow() {
    isPlaying = true;
    renderSlide(currentIndex);
}

function pauseContinue() {
    isPlaying = !isPlaying;
    clearTimeout(timer);
    if (isPlaying) {
        renderSlide(currentIndex);
    }
}

function nextSlide() {
    if (currentIndex < slidesData.slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first slide
    }
    renderSlide(currentIndex);
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slidesData.slides.length - 1; // Go to the last slide
    }
    renderSlide(currentIndex);
}

function setupButtons() {
    var pauseButton = document.getElementById("paus");
    var nextButton = document.getElementById("suiv");
    var prevButton = document.getElementById("but_prev");

    pauseButton.addEventListener("click", pauseContinue);
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
}
