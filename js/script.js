window.addEventListener('DOMContentLoaded', () =>{

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i); 
                }
            })
        }
    });

    // Timer

    const deadline = '2022-01-01';

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

    setClock('.timer', deadline);

    // Modal
   
    const modal = document.querySelector('.modal'),
          modalTriger = document.querySelectorAll('[data-modal]');
        //   modalCloseBtn = document.querySelector('[data-close]');
    

    function openModal (){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeId);
        // modal.style.display = "block";  
    }

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        // modal.style.display = 'none';   
    }

    modalTriger.forEach(btn =>{
        btn.addEventListener('click', openModal);
    } );
    
    // modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    const modalTimeId = setTimeout(openModal, 50000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.
        documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

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

    getResourse('http://localhost:3000/menu')
        .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
    
    // getResourse('http://localhost:3000/menu')
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


    // Forms

    const forms = document.querySelectorAll('form');

    const massege = {
        loading: 'img/form/spinner.svg',
        success: "Thank's! We will contact you shortly",
        failure: "What's going wrong..."
    };

    forms.forEach(item => {
        bindPostData(item); 
        console.log("dick");
    });

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

    async function getResourse (url) {
        const res = await fetch(url);

        if (!res.ok){
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }
        
        return await res.json();
    };

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

            postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        }, 4000);
    }

   // Fuck'n slides

   const slides = document.querySelectorAll('.offer__slide'),
         slider = document.querySelector('.offer__slider'),
         total = document.querySelector('#total'),
         current = document.querySelector('#current'),
         next = document.querySelector('.offer__slider-next'),
         prev = document.querySelector('.offer__slider-prev'),
         slidesWrapper = document.querySelector('.offer__slider-wrapper'),
         slidesField = document.querySelector('.offer__slider-inner'),
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

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to'); // витягуєм значення атрибуту

            slideIndex = slideTo;
            offset = (slideTo - 1) * +width.slice(0, width.length - 2);

            slidesField.style.transform = `translateX(-${offset}px)`;

            zeroBefore();

            dotActive();
        });

        
    });

    // dots[0].addEventListener('click', () => {console.log('raz pshik siv na hui')});
    // console.log(dots);
    
    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length -1)){
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
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
            offset = +width.slice(0, width.length - 2) * (slides.length -1);
        } else {
            offset -= +width.slice(0, width.length - 2);
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
    
});

