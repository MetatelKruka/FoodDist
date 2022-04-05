/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calc

const result = document.querySelector('.calculating__result span');



let sex, height, weight, age, ratio;

function initLocalSetting (selector, activeClass){
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')){
          elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
          elem.classList.add(activeClass);
      }
  });
}

initLocalSetting('#gender div', 'calculating__choose-item_active');
initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

if(localStorage.getItem('sex')){
  sex = localStorage.getItem('sex');
} else {
  sex = 'famale';
  localStorage.setItem('sex', sex);
}
console.log(sex);

if(localStorage.getItem('ratio')){
  ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', ratio);
  // console.log(typeof(localStorage.setItem('ratio', ratio)));
}

function calcTotal (){
  if (!sex || !height || !weight || !age || !ratio){
      result.textContent = '_____';
      return;
  }

  if (sex === 'famale') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
      result.textContent = Math.round((88.36 + (13.4 *weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
}
calcTotal();

function getStaticInformation(selector, activeClass){
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
          if (e.target.getAttribute('data-ratio')) {
              ratio = +e.target.getAttribute('data-ratio');
              localStorage.setItem('ratio', ratio);
          } else {
              sex = e.target.getAttribute('id');
              localStorage.setItem('sex', sex);
          }

          elements.forEach(elem => {
              elem.classList.remove(activeClass);
          });
          
          e.target.classList.add(activeClass);
          
          calcTotal();
      });
  });
}

getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation (selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {

      if (input.value.match(/\D/g)){
          input.style.border = '1px solid red';
      } else {
          input.style.border = 'none';
      }

      switch(input.getAttribute('id')) {
          case 'height':
              height = +input.value;
              break;
          case 'weight':
              weight = +input.value;
              break;
          case 'age':
              age = +input.value;
              break;
      }
      
      calcTotal();
  });


  
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {


    // Forms

    const forms = document.querySelectorAll(formSelector);

    const massege = {
        loading: 'img/form/spinner.svg',
        success: "Thank's! We will contact you shortly",
        failure: "What's going wrong..."
    };

    forms.forEach(item => {
        bindPostData(item); 
        console.log("dick");
    });

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMassage = document.createElement('img');
            statusMassage.src = massege.loading;
            statusMassage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMassage); 

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                console.log('sosoK');
                showThanksModal(massege.success);
            
                statusMassage.remove();
            })
            .catch(() => {
                showThanksModal(massege.failure);
            })
            .finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal(massege){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        console.log(massege);
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${massege}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/menuCards.js":
/*!*********************************!*\
  !*** ./js/modules/menuCards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function menuCards() {
    // Classes

    class MenuCard {
        constructor(
            img, altimg, title, descr, price, parentSelector, ...classes
        ){
            this.title = title;
            this.img = img;
            this.altimg = altimg;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {;
            const element = document.createElement('div');
            if(!this.classes.length){
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src="${this.img}" alt="${this.altimg}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${ this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
    
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard (data){
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         price *= 27;

    //         element.innerHTML = `
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>`;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }


    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal (modalSelector, modalTimerId){
   const modal = document.querySelector(modalSelector);

   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   console.log(modalTimerId);
   if (modalTimerId){
      clearInterval(modalTimerId);
   }
  
   // modal.style.display = "block";  
}

function closeModal (modalSelector) {
   const modal = document.querySelector(modalSelector);

   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
   // modal.style.display = 'none';   
}

function modal (triggerSelector, modalSelector, modalTimerId) {
     // Modal
   
     const modal = document.querySelector(modalSelector),
     modalTriger = document.querySelectorAll(triggerSelector);
   //   modalCloseBtn = document.querySelector('[data-close]');


modalTriger.forEach(btn =>{
   btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
} );

// modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
   if(e.target === modal || e.target.getAttribute('data-close') == ''){
       closeModal(modalSelector);
   }
});

document.addEventListener('keydown', (e) => {
   if(e.code === 'Escape' && modal.classList.contains('show')){
       closeModal(modalSelector);
   }
});



function showModalByScroll(){
   if(window.pageYOffset + document.documentElement.clientHeight >= document.
   documentElement.scrollHeight) {
       openModal(modalSelector, modalTimerId);
       window.removeEventListener('scroll', showModalByScroll);
   }
}

window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slides({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrepper, field}) {
       // Fuck'n slides

   const slides = document.querySelectorAll(slide),
   slider = document.querySelector(container),
   total = document.querySelector(totalCounter),
   current = document.querySelector(currentCounter),
   next = document.querySelector(nextArrow),
   prev = document.querySelector(prevArrow),
   slidesWrapper = document.querySelector(wrepper),
   slidesField = document.querySelector(field),
   width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if(slides.length < 10){
  total.textContent = `0${slides.length}`;
  current.textContent = `0${slideIndex}`;
} else {
  total.textContent = slides.length;
  current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex'; // flex переводить зображення в 1 лінію
slidesField.style.transition = '0.5s all'; // зміюючи властивість transition ми робимо плавне пересування слайдів

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
  slide.style.width = width;
});

slider.style.position = 'relative'; // тепер усі е-менти які абсолюно зпозиціонвані всередині 
                                  // слайду будуть нормально відображатися

const indicators = document.createElement('ol'), // ol  викорю для впорядкованих, перевежю нум. списків.
      dots = []; //slider.querySelectorAll('.carousel-indicators li');

indicators.classList.add('carousel-indicators');

indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
slider.append(indicators);

for(let i = 0; i < slides.length; i++){
  const dot = document.createElement('li'); // li викор. для представлення е-мента в списку.
  dot.setAttribute('data-slide-to', i + 1);

  dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
  `;
  if (i === 0){
      dot.style.opacity = 1;
  }
  indicators.append(dot);
  dots.push(dot);
}

// const dots = dos.querySelectorAll('li');

function dotActive () {
  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = 1;
}

function zeroBefore () {
  if (slides.length < 10) {
      current.textContent =  `0${slideIndex}`;
  } else {
      current.textContent =  slideIndex;
  }
}

function onlyNumber (string){
  return +string.replace(/\D/ig, '');
}

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to'); // витягуєм значення атрибуту

      slideIndex = slideTo;
      offset = (slideTo - 1) * onlyNumber(width);//+width.slice(0, width.length - 2);

      slidesField.style.transform = `translateX(-${offset}px)`;

      zeroBefore();

      dotActive();
  });

  
});

// dots[0].addEventListener('click', () => {console.log('raz pshik siv na hui')});
// console.log(dots);

next.addEventListener('click', () => {
  if (offset == onlyNumber(width) * (slides.length -1)){
      offset = 0;
  } else {
      offset += onlyNumber(width);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == slides.length) {
      slideIndex = 1;
  } else {
      slideIndex++;
  }

  zeroBefore();
  dotActive();
});

prev.addEventListener('click', () => {
  if (offset == 0){
      offset = onlyNumber(width) * (slides.length -1);
  } else {
      offset -= onlyNumber(width);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;


  if (slideIndex == 1) {
      slideIndex = slides.length;
  } else {
      slideIndex--;
  }

  zeroBefore();
  dotActive();
});

// function removeZero (string) {
//     let num = [];

//     for (let i = 0; i < string.length; i++){
//         if (string.split('')[i] === '0'){
//             continue;
//         } else {
//         for (let j = i; j < string.length; j++){
//             num[j-i] = string.split('')[j];
//         }
//         break;
//         }
//     }

//     return +num.join('');
// }

// let hz = removeZero(actualNumberOfSlide.innerHTML);

// if(slides.length < 10){
//     quantitySlides.textContent = `0${slides.length}`;
// } else {
//     quantitySlides.textContent = `${slides.length}`;
// }

// function showSlide (){

//     if(slides.length < 10){
//         actualNumberOfSlide.textContent = `0${hz+1}`;
//     } else {
//         actualNumberOfSlide.textContent = `${hz}`;
//     }

//     slides.forEach((item, i) => {
//         if(hz === i){
//             slides[hz].classList.remove('hide');
//             slides[hz].classList.add('show');
//         } else {
//             item.classList.add('hide');
//             item.classList.remove('show');
//         }
//     });
// }

// showSlide();

// nextSlide.addEventListener('click', (e) => {
//     // e.defaultPrevented();

//     if(hz === slides.length - 1){
//         hz = 0;
//     } else {
//         hz++;
//     }

//     showSlide();
// });

// prevSlide.addEventListener('click', (e) => {
//     // e.defaultPrevented();

//     if(hz === 0){
//         hz = slides.length - 1;
//     } else {
//         hz--;
//     }

//     showSlide();
// });



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // Timer

    console.log(deadline);

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };      
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    
    return await res.json();
};

async function getResource (url) {
    const res = await fetch(url);

    if (!res.ok){
        throw new Error (`Could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_menuCards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/menuCards */ "./js/modules/menuCards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");









window.addEventListener('DOMContentLoaded', function() 
{
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 300000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_menuCards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_slides__WEBPACK_IMPORTED_MODULE_3__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrepper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])('.timer', '2022-06-11');
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId);

});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map