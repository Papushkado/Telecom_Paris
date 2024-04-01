document.addEventListener("DOMContentLoaded", function() {
    function loadSlides(callback) {
      var xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open('GET', 'slides.json', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();
    }
  
    function playSlideshow(slides) {
      var container = document.getElementById('container');
      var playButton = document.getElementById('pl');
      var pauseButton = document.getElementById('paus');
      var nextButton = document.getElementById('suiv');
      var prevButton = document.getElementById('but_prev');
  
      var currentIndex = 0;
      var playing = false;
      var paused = false;
  
      function showSlide(index) {
        var slide = slides[index];
        container.innerHTML = "";
        if (slide && slide.url !== "") {
          var iframe = document.createElement('iframe');
          iframe.src = slide.url;
          container.appendChild(iframe);
        }
      }
  
      function playNext() {
        if (currentIndex < slides.length) {
          showSlide(currentIndex);
          currentIndex++;
          setTimeout(playNext, (slides[currentIndex].time - slides[currentIndex - 1].time) * 1000);
        } else {
          playing = false;
          playButton.innerHTML = "Play";
        }
      }
  
      playButton.addEventListener('click', function() {
        if (!playing) {
          playing = true;
          playButton.innerHTML = "Pause";
          playNext();
        } else {
          playing = false;
          playButton.innerHTML = "Play";
        }
      });
  
      pauseButton.addEventListener('click', function() {
        paused = !paused;
        playButton.innerHTML = paused ? "Continue" : "Pause";
      });
  
      nextButton.addEventListener('click', function() {
        if (currentIndex < slides.length) {
          playing = false;
          playButton.innerHTML = "Play";
          showSlide(currentIndex);
          currentIndex++;
        }
      });
  
      prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
          playing = false;
          playButton.innerHTML = "Play";
          currentIndex -= 2;
          showSlide(currentIndex);
          currentIndex++;
        }
      });
    }
  
    loadSlides(function(slides) {
      playSlideshow(slides.slides);
    });
  });
  