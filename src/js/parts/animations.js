import {
  gsap
} from "gsap";

import {
  ScrollTrigger
} from "gsap/ScrollTrigger";
import {
  TextPlugin
} from "gsap/TextPlugin";


gsap.registerPlugin(ScrollTrigger, TextPlugin);


gsap.to(".mask", {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: .5,
  ease: "power2.out",
});

// Function to create the GSAP animation
function createAppearAnimation(element) {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  });
}

// Loop through each element with the .appear_effect class
gsap.utils.toArray('.appear_effect').forEach(element => {
  // Create the ScrollTrigger for each element
  ScrollTrigger.create({
    trigger: element,
    start: "top 75%", // Adjust this value based on when you want the animation to start
    onEnter: () => createAppearAnimation(element),
    once: true,
  });
});


const pulsatingBox = document.getElementById('pulsating-box');
const innermostBorder = document.getElementById('innermost');
const middleBorder = document.getElementById('middle');
const outermostBorder = document.getElementById('outermost');

// Duration of the animations


const pulseTimeline = gsap.timeline({
  repeat: -1,
  repeatDelay: .5,
  ease: "power2.inOut"
});

pulseTimeline.to(pulsatingBox, {
  boxShadow: '0px 0px 120px rgba(66, 151, 247, 1), 0px 0px 136px #0C2E63',
  duration: 1.5,
});
pulseTimeline.to(pulsatingBox, {
  boxShadow: '0px 0px 40px rgba(66, 151, 247, 0.20), 0px 0px 68px #0C2E63',
  duration: 1.5
});


// const animationDuration = .5;

// // Pulsating border animation
// const borderTimeline = gsap.timeline({
//     repeat: -1,
//     repeatDelay: .5,
//   });

//   borderTimeline.to(innermostBorder, {
//     border: '1px solid rgba(99, 171, 252, 1)',
//     duration: animationDuration
//   });
//   borderTimeline.to(middleBorder, {
//     border: '1px solid rgba(99, 171, 252, 1)',
//     duration: animationDuration
//   });
//   borderTimeline.to(outermostBorder, {
//     border: '1px solid rgba(99, 171, 252, 1)',
//     duration: animationDuration
//   });
//   borderTimeline.to(outermostBorder, {
//     border: '1px solid rgba(99, 171, 252, 0.05)',
//     duration: animationDuration
//   });
//   borderTimeline.to(middleBorder, {
//     border: '1px solid rgba(99, 171, 252, 0.15)',
//     duration: animationDuration
//   });

//   borderTimeline.to(innermostBorder, {
//     border: '1px solid rgba(99, 171, 252, 0.2)',
//     duration: animationDuration
//   });



// Start animations on load
// borderTimeline.play();

// Pause and resume on hover
pulsatingBox.addEventListener('mouseenter', () => {
  pulseTimeline.pause();
});

pulsatingBox.addEventListener('mouseleave', () => {
  pulseTimeline.resume();
});