const burgerBtn = document.querySelector('.burger');
const overlay = document.querySelector('.menu');
const navEl = document.querySelectorAll('.nav_el');
const navDestination = document.querySelectorAll('.navDestination');

function toggleNav() {
  overlay.classList.toggle("overlay");
  burgerBtn.classList.toggle("close");
}

burgerBtn.addEventListener('click', toggleNav);

navEl.forEach((element, index) => {
    element.addEventListener('click', () => {
        overlay.classList.remove('overlay');
        burgerBtn.classList.remove("close");
        navDestination[index].scrollIntoView();

        navEl.forEach((el) => {
          el.classList.remove('active');
        });

        element.classList.add('active');
    });
});