document.addEventListener("DOMContentLoaded", function() {
    loadSlides();
});

function loadSlides() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var slidesData = JSON.parse(xhr.responseText);
            renderSlides(slidesData);
        }
    };
    xhr.open("GET", "slides.json", true);
    xhr.send();
}

function renderSlides(slidesData) {
    var container = document.getElementById("container");
    container.innerHTML = ""; 

    slidesData.slides.forEach(function(slide) {
        setTimeout(function() {
            container.innerHTML = `<iframe src="${slide.url}" style="width:100%; height:100vh;"></iframe>`;
        }, slide.time * 1000);
    });
}

function playSlideshow() {
    loadSlides(); 
}
