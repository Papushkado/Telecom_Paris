document.addEventListener("DOMContentLoaded", function () {
    var slides, container, playButton, pauseButton, nextButton, prevButton;
    var currentIndex = 0;
    var intervalId;
  
    
    function loadSlides(callback) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          slides = JSON.parse(xhr.responseText);
          callback();
        }
      };
      xhr.open("GET", "slides.json", true);
      xhr.send();
    }
  
    
    function playSlideshow() {
      container.innerHTML = ''; 
      var slide = slides[currentIndex];
      if (slide && slide.url !== "") {
        var iframe = document.createElement("iframe");
        iframe.src = slide.url;
        container.appendChild(iframe);
      }
      currentIndex++;
    }
  
   
    function startSlideshow() {
      currentIndex = 0;
      intervalId = setInterval(playSlideshow, 1000);
    }
  
    
    function pauseContinueSlideshow() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      } else {
        startSlideshow();
      }
    }
  
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      playSlideshow();
    }
  
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      playSlideshow();
    }
  
    
    function init() {
      container = document.getElementById("container");
      playButton = document.getElementById("pl");
      pauseButton = document.getElementById("paus");
      nextButton = document.getElementById("suiv");
      prevButton = document.getElementById("but_prev");
  
      playButton.addEventListener("click", startSlideshow);
      pauseButton.addEventListener("click", pauseContinueSlideshow);
      nextButton.addEventListener("click", nextSlide);
      prevButton.addEventListener("click", prevSlide);
    }
  
    
    loadSlides(init);
  });
  