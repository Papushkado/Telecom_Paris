var slides;
var id_current = 0;
var stop = true;
var is_start = true;

function updateUrl(url, is_next) {
    if (!stop || is_next) {
        var iframe = document.createElement('iframe');
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.src = url;
        iframe.id = "previous";
        const obj = document.getElementById("MAIN");
        const objprevious = document.getElementById("previous");
        if (objprevious !== null) {
            obj.removeChild(objprevious);
        }
        obj.appendChild(iframe);
    } else {
        id_current = id_current - 2;
    }
}

function playSlideshow() {
    fetch('slides.json')
        .then(response => response.json())
        .then(data => {
            slides = data.slides;
        })
        .catch(error => {
            console.error('Error loading slides.json', error);
        });
}

function nextSlide() {
    if (id_current != 10 && !is_start) {
        id_current = id_current + 2;
        updateUrl(slides[id_current / 2].url, true);
    }
    if (is_start) {
        is_start = false;
        updateUrl(slides[id_current].url, true);
    }
}

function prevSlide() {
    if (id_current != 0) {
        id_current = id_current - 2;
        updateUrl(slides[id_current / 2].url, true);
    }
}

function pauseContinue() {
    if (stop) {
        stop = false;
        if (id_current != 10 && !stop) {
            setTimeout(function () {
                id_current = id_current + 2;
                updateUrl(slides[id_current / 2].url, false);
                pauseContinue();
            }, 2 * 1000);
        }
    } else {
        stop = true;
    }
}
