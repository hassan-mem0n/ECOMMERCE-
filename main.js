// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function pop login notification
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener  login notification
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

/*=============== SWIPER CATEGORIES ===============*/
var swiperCategories = new Swiper(".categories--container", {
    spaceBetween:24,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
      },
  });

/*=============== SWIPER PRODUCTS ===============*/
var swiperProduct = new Swiper(".new--container", {
    spaceBetween:24,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
      },
  });










//   pararal tab
const tabs = document.querySelectorAll('[data-target]'),
 tabContents = document.querySelectorAll('[content]');


 tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
  const target = document.querySelector(tab.dataset.target);
tabContents.forEach((tabContent) => {
  tabContent.classList.remove('active-tab')
});  
target.classList.add('active-tab');

tabs.forEach((tab) => { 
  tab.classList.remove('active-tab')
});  
tab.classList.add('active-tab')


  });
 });