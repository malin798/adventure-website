$(document).ready(function() {

  const parallaxText = document.getElementById("parallax-text");
  const parallaxElement = document.getElementById("parallax-element");
  const elementsToShow = document.querySelectorAll('.show-on-scroll');

  let lastScrollTop = 0;
  let scrollDirection;
  let reviewIndex = 0;

  $(".hamburger-icon").on("click", function() {
    $(this).toggleClass("open")
  })

  $(".social-media-item").hover(function() {
    $(this).find(".social-media-image-description").slideToggle(250)
  })

  //image parallax
  function loop2() {
    if (isElementInViewport(parallaxElement)) {
      const value = window.scrollY;
      parallaxText.style.top = value * 1 + "px";
      parallaxText.style.opacity = 1 / (value/100);
    } 
  }
  
  //text scroll
  window.addEventListener("scroll", function() {
    loop()
    loop2()
    detectScrollDirection()
  })

  //print all reviews
  function printSelectedReview(reviewIndex) {
    $("#review-item").empty()
    $("#review-item").append(
      `<h3>${reviews[reviewIndex].header}</h3>` +
      ` <p>"${reviews[reviewIndex].text}"</p>` +
      `<p class="review-author">- ${reviews[reviewIndex].author}, ${reviews[reviewIndex].city}</p>`
    )
    buttonDisplay()
  }
  
  // review buttons
  function buttonDisplay() {
    if (reviewIndex === 0) {
      $(".previous-review").hide()
    } else {
      $(".previous-review").show()
    }
    if (reviewIndex === reviews.length - 1) {
      $(".next-review").hide()
    } else {
      $(".next-review").show()
    }
  }

  $(".previous-review").on("click", function() {
    reviewIndex = reviewIndex - 1
    printSelectedReview(reviewIndex)
  })
  $(".next-review").on("click", function() {
    reviewIndex = reviewIndex + 1
    printSelectedReview(reviewIndex)
  })
  
  function loop() {
    elementsToShow.forEach(function (element) {
      if (isElementInViewport(element)) {

        if (!element.classList.contains("visible")) {
          element.classList.add("visible")

          if (scrollDirection === "up") {
            element.classList.add("slideup")
          } else {
            element.classList.add("slidedown")
          }
        } 
      } else {
        element.classList.remove("visible")
        element.classList.remove("slideup")
        element.classList.remove("slidedown")
      }
    })
  }

  loop()
  loop2()
  printSelectedReview(reviewIndex)
  
  function detectScrollDirection() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop){
    scrollDirection = "down"
    } else {
    scrollDirection = "up"
    }

    lastScrollTop = st ;
  }
})


function isElementInViewport(element) {

  const selectedRectangle = element.getBoundingClientRect();

  return (
    (selectedRectangle.top <= 0
      && selectedRectangle.bottom >= 0)
    ||
    (selectedRectangle.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
    selectedRectangle.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (selectedRectangle.top >= 0 &&
      selectedRectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

const reviews = [
  {
    header: "A must see",
    text: "I booked the three day trip and had the most wonderful time! The guide was very knowleadgable and taught me a lot. The surroundings along the trail is absolutely a must see!",
    author: "Malin Andersson", 
    city: "Karlstad"
  },
  {
    header: "Best weekend in a long time",
    text: "Quam adipiscing vitae proin sagittis nisl. Quis eleifend quam adipiscing vitae proin sagittis. Nunc eget lorem dolor sed viverra ipsum nunc. Faucibus purus in massa tempor",
    author: "Sara Nilsson", 
    city: "Gothenburg"
  },
  {
    header: "Great value!",
    text: "Id cursus metus aliquam eleifend mi in. Ultrices neque ornare aenean euismod elementum nisi quis",
    author: "Kristoffer Olsson", 
    city: "Örebro"
  }
]