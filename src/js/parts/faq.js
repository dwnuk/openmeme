// // Get all parent elements
// const faqEls = document.querySelectorAll('.faq__el');

// // Add click event listener to each parent
// faqEls.forEach(faqEl => {
//   faqEl.addEventListener('click', () => {

//     faqEls.forEach(el => {
//       if (el.classList.contains('show')) {
//         el.classList.toggle('show');
//       }
//     });

//     // Toggle 'show' class on the parent
//     faqEl.classList.toggle('show');

//     // Toggle 'toggle' class on the child
//     const child = faqEl.querySelector('.collapse-btn');
//     child.classList.toggle('toggle');
//   });
// });

// Get all elements with the class 'toggle-element'
const elements = document.querySelectorAll('.faq__el');

// Function to remove 'show' class from all elements except the provided one
function showOnly(elementToShow) {
    elements.forEach(element => {
      const child = element.querySelector('.collapse-btn');


        if (element !== elementToShow) {
            element.classList.remove('show');
            child.classList.remove('toggle');
        }
    });
}

// Function to toggle the 'show' class on an element
function toggleShowClass(element) {
    element.classList.toggle('show');
}

// Attach a click event listener to each element
elements.forEach(element => {
    element.addEventListener('click', () => {
        // Remove 'show' class from all elements except the clicked one
        showOnly(element);

        // Toggle the 'show' class on the clicked element
        toggleShowClass(element);

        const child = element.querySelector('.collapse-btn');
        child.classList.toggle('toggle');
    });
});