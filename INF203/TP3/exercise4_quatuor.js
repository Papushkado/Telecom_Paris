var slidesData;
var currentIndex = 0;
var isPlaying = false;
var timer;

document.addEventListener("DOMContentLoaded", function () {
    loadSlides();
});

function loadSlides() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            slidesData = JSON.parse(xhr.responseText);
            renderSlides();
        }
    };
    xhr.open("GET", "slides.json", true);
    xhr.send();
}

function renderSlides() {
    var container = document.getElementById("container");
    container.innerHTML = ""; 

    slidesData.slides.forEach(function (slide, index) {
        var iframe = document.createElement("iframe");
        iframe.src = slide.url;
        iframe.style.width = "100%";
        iframe.style.height = "100vh";
        iframe.style.display = "none";
        container.appendChild(iframe);
    });
}

function playSlideshow() {
    isPlaying = true;
    playSlide(currentIndex);
}

function pauseContinue() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playSlide(currentIndex);
    } else {
        clearTimeout(timer);
    }
}

function nextSlide() {
    if (currentIndex < slidesData.slides.length - 1) {
        currentIndex++;
        playSlide(currentIndex);
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        playSlide(currentIndex);
    }
}

function playSlide(index) {
    var container = document.getElementById("container");
    var iframes = container.getElementsByTagName("iframe");

    for (var i = 0; i < iframes.length; i++) {
        iframes[i].style.display = "none";
    }

    if (isPlaying) {
        iframes[index].style.display = "block";
        timer = setTimeout(function () {
            if (currentIndex < slidesData.slides.length - 1) {
                currentIndex++;
                playSlide(currentIndex);
            }
        }, slidesData.slides[index].time * 1000);
    }
}

//Pour fermer la page quand trop de temps passer pour accelerer les tests
/*window.onbeforeunload = function () {
    clearTimeout(timer);
};*/ 
