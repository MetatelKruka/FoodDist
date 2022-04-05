import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;