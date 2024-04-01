    var slidesData;
    var currentIndex = 0;
    var isPlaying = false;
    var timer;
    var startTime;

    loadSlides();

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
        container.innerHTML = `<iframe src="${slidesData.slides[index].url}" style="width:100%; height:100vh;"></iframe>`;
    }

    function nextSlide() {
        if (currentIndex < slidesData.slides.length - 1) {
            currentIndex++;
            renderSlide(currentIndex);
            scheduleNextSlide();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            renderSlide(currentIndex);
            scheduleNextSlide();
        }
    }

    function scheduleNextSlide() {
        if (isPlaying && currentIndex < slidesData.slides.length - 1) {
            var currentTime = new Date().getTime();
            var timeDifference = slidesData.slides[currentIndex + 1].time * 1000 - startTime;
            
            timer = setTimeout(function () {
                currentIndex++;
                renderSlide(currentIndex);
                scheduleNextSlide();
            }, timeDifference);
        }
    }

    function continueSlideshow() {
        if (currentIndex < slidesData.slides.length - 1 && isPlaying) {
            startTime = new Date().getTime();
            scheduleNextSlide();
        }
    }

    function pauseContinue() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            startTime = new Date().getTime();
            scheduleNextSlide();
        } else {
            clearTimeout(timer);
        }
    }
