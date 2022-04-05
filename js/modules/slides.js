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

export default slides;