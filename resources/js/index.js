// import EmblaCarouselController from "./emblaCarousel";
// // trending menu carousel

// const carouselOption = { align: "start", dragFree: true, loop: true };

// const emblaNode = document.querySelector(".embla");
// const viewportNode = emblaNode.querySelector(".embla__viewport");
// const prevBtnNode = emblaNode.querySelector(".embla__button--prev");
// const nextBtnNode = emblaNode.querySelector(".embla__button--next");
// new EmblaCarouselController(
//   emblaNode,
//   viewportNode,
//   {
//     nextBtnNode,
//     prevBtnNode,
//   },
//   carouselOption,
//   {
//     delay: 4000,
//     stopOnInteraction: false,
//     stopOnMouseEnter: true,
//   }
// );

// // trending products

// const productEmblaNode = document.querySelector(".trending__products-carousel");
// const productViewportNode = productEmblaNode.querySelector(
//   ".trending__products-viewport"
// );
// const productPrevBtnNode = productEmblaNode.querySelector(
//   ".embla__button--prev"
// );
// const productNextBtnNode = productEmblaNode.querySelector(
//   ".embla__button--next"
// );
// new EmblaCarouselController(
//   productEmblaNode,
//   productViewportNode,
//   {
//     nextBtnNode: productNextBtnNode,
//     prevBtnNode: productPrevBtnNode,
//   },
//   carouselOption,
//   {
//     delay: 4000,
//     stopOnInteraction: false,
//     stopOnMouseEnter: true,
//   }
// );
// swiper menu_list
const swiperMenuEl = new Swiper(".swiper__list", {
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  slidesPerView: "4",
  loop: true,
  mousewheel: {
    invert: true,
  },

  pagination: {
    el: ".swiper-pagination",
  },
});
console.log(swiperMenuEl);
document.body.addEventListener("click", (e) => {
  console.log(!e.target.closest(".carousel__button-prev"));

  // swiperMenuEl[0].slideNext();
  if (e.target.closest(".carousel__button-prev")) {
    swiperMenuEl.forEach((el) => {
      if (
        el.el === e.target.closest(".carousel")?.querySelector(".swiper__list")
      ) {
        el.slidePrev();
      }
    });
  } else if (e.target.closest(".carousel__button-next")) {
    //   swiperMenuEl.slideNext();
    swiperMenuEl.forEach((el) => {
      if (
        el.el === e.target.closest(".carousel")?.querySelector(".swiper__list")
      ) {
        el.slideNext();
      }
    });
  } else {
    return;
  }
});

// swiper js recents__comments
const swiper = new Swiper(".recent-reviews__list", {
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "3",
  loop: true,
  mousewheel: {
    invert: true,
  },
  coverflowEffect: {
    // rotate: 50,
    stretch: 2,
    depth: 100,
    modifier: 1,
    // slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    0: {
      // small screens
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      // large screens
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

// Now you can use all slider methods like

// adding transition on the recents reviews after 1s of site being load

const recentReviewsEl = document.querySelector(
  ".recent-reviews__list .recent-reviews__wrapper"
);

setTimeout(() => {
  recentReviewsEl.classList.add("swiper__animation");
}, 5000);

const recentReviewsCarouselEl = document.querySelector(".recent-reviews__list");

recentReviewsCarouselEl.addEventListener("click", (e) => {
  if (
    !e.target.closest(".swiper-button-prev") ||
    !e.target.closest(".swiper-button-next")
  )
    if (e.target.closest(".swiper-button-prev")) {
      swiper.slidePrev();
    }
  if (e.target.closest(".swiper-button-next")) {
    swiper.slideNext();
  }
});
