/*
 this script is made to fade in and out the background image of a divi section
 add the #jsf-bg-slider id to the section you want to have the background image fade effect
 make sure that section bg color is set to transparent
 parallax effect should be enabled
 and im using a gradient overlay on tha bg image
*/

// JavaScript to manage the background image fade effect on page load
document.addEventListener("DOMContentLoaded", () => {
  const imageUrls = [
    "https://mdotweb.com/img/bg-1.jpg",
    "https://mdotweb.com/img/bg-2.jpg",
    "https://mdotweb.com/img/bg-3.jpg",
    "https://mdotweb.com/img/bg-4.jpg",
  ];

  const FADE_DUR = 1500; // Transition duration in milliseconds
  const INTERVAL_DUR = 3000; // Interval between images in milliseconds
  let currentIndex = 1;

  const bgElements = document.querySelectorAll("#jsf-bg-slider .et_parallax_bg");
  if (bgElements.length === 0) {
    return;
  }

  // Preload images
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });

  // Initial image load for primary and backer
  bgElements.forEach((bgElement) => {
    bgElement.style.backgroundImage = `url(${imageUrls[0]})`;
    bgElement.style.transition = `opacity ${FADE_DUR}ms`;
  });

  // Create backer elements and set initial background
  const backerElements = [];
  bgElements.forEach((bgElement) => {
    const backer = bgElement.cloneNode(true);
    backer.classList.add("backer");
    backer.style.zIndex = "-1";
    backer.style.backgroundImage = `url(${imageUrls[1]})`;
    bgElement.parentNode.insertBefore(backer, bgElement.nextSibling);
    backerElements.push(backer);
  });
  console.log(backerElements);

  function updateBackgroundImage() {
    console.log("ran updateBackgroundImage");
    // Set up the next pair of images
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    const backerIndex = (currentIndex + 2) % imageUrls.length;

    backerElements.forEach((backerElement) => {
      backerElement.style.backgroundImage = `url(${imageUrls[backerIndex]})`;
    });
    // Fade out primary background and update image
    bgElements.forEach((bgElement) => {
      bgElement.style.opacity = 0; // Fade out
      setTimeout(() => {
        console.log("ran setTimeout");
        bgElement.style.backgroundImage = `url(${imageUrls[nextIndex]})`;
        bgElement.style.opacity = 1;
      }, INTERVAL_DUR);
    });

    currentIndex = backerIndex;
  }

  // Start the interval for background changes
  const interval = setInterval(updateBackgroundImage, INTERVAL_DUR);
  //stop the interval after it runs 1 time
  setTimeout(() => {
    clearInterval(interval);
    setInterval(updateBackgroundImage, INTERVAL_DUR * 2);
  }, INTERVAL_DUR);
});
