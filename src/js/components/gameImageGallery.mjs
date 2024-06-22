let slideIndex = 1;

export function plusSlides(n) {
  showSlides(slideIndex += n);
}

export function currentSlide(n) {
  showSlides(slideIndex = n);
}

export function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".demo");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
  }

  if (dots.length > 0) {
    dots[slideIndex - 1].classList.add("active");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);

  document.querySelectorAll(".prev").forEach(element => {
    element.addEventListener("click", () => plusSlides(-1));
  });

  document.querySelectorAll(".next").forEach(element => {
    element.addEventListener("click", () => plusSlides(1));
  });

  document.querySelectorAll(".demo").forEach((element, index) => {
    element.addEventListener("click", () => currentSlide(index + 1));
  });
});
