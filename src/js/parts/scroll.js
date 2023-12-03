// more scroll

const moreBtn = document.querySelector('.more');
const trafficSection = document.querySelector('.traffic');

moreBtn.addEventListener('click', () => {
  trafficSection.scrollIntoView()
});