let slideIndex = 0;
let slides;
let slideTimer;

function showSlides() {
  slides = document.getElementsByClassName("slides");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  slideTimer = setTimeout(showSlides, 3000); // Auto-switch every 3 sec
}

function nextSlide() {
  clearTimeout(slideTimer);
  showSlide(slideIndex + 1);
}

function prevSlide() {
  clearTimeout(slideTimer);
  showSlide(slideIndex - 1);
}

function showSlide(n) {
  slides = document.getElementsByClassName("slides");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex = n;
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slideIndex < 1) { slideIndex = slides.length; }

  slides[slideIndex - 1].style.display = "block";
  slideTimer = setTimeout(showSlides, 3000);
}

window.onload = showSlides;
