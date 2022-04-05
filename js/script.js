import calc from './modules/calc';
import menuCards from './modules/menuCards';
import modal from './modules/modal';
import slides from './modules/slides';
import tabs from './modules/tabs';
import timer from './modules/timer';
import forms from './modules/forms';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() 
{
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    calc();
    menuCards();
    modal('[data-modal]', '.modal', modalTimerId);
    slides({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrepper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-06-11');
    forms('form', modalTimerId);

});

