// Get all parent elements
const faqEls = document.querySelectorAll('.faq__el');

// Add click event listener to each parent
faqEls.forEach(faqEl => {
  faqEl.addEventListener('click', () => {
    // Toggle 'show' class on the parent
    faqEl.classList.toggle('show');

    // Toggle 'elo' class on the child
    const child = faqEl.querySelector('.collapse-btn');
    child.classList.toggle('toggle');
  });
});