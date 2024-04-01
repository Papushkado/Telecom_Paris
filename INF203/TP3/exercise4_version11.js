document.addEventListener("DOMContentLoaded", function () {
    var slides, container, playButton, pauseButton, nextButton, prevButton;
    var currentIndex = 0;
    var intervalId;
  
    // Function to load slides.json file with AJAX
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
  
    // Function to play the slideshow
    function playSlideshow() {
      container.innerHTML = ''; // Empty the container
      var slide = slides[currentIndex];
      if (slide && slide.url !== "") {
        var iframe = document.createElement("iframe");
        iframe.src = slide.url;
        container.appendChild(iframe);
      }
      currentIndex++;
      if (currentIndex >= slides.length) {
        currentIndex = 0; // Reset to the first slide
      }
    }
  
    // Function to start the slideshow
    function startSlideshow() {
      currentIndex = 0;
      intervalId = setInterval(playSlideshow, 1000);
    }
  
    // Function to pause/continue the slideshow
    function pauseContinueSlideshow() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      } else {
        startSlideshow();
      }
    }
  
    // Function to show the next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      playSlideshow();
    }
  
    // Function to show the previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      playSlideshow();
    }
  
    // Initialize variables and event listeners
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
  
    // Load slides and initialize
    loadSlides(init);
  });
  