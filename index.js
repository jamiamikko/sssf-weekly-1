'use strict';

let picArray;
let filterArray;

const modal = document.getElementById('modal');
const sortGirlfriendBtn = document.getElementById('sort-girlfriend');
const sortWifedBtn = document.getElementById('sort-wife');
const sortResetBtn = document.getElementById('sort-reset');
const displayDateBtn = document.querySelector('#display-date');
const thumbnailList = document.querySelector('#thumbnail-list');

const initThumbnails = () => {
    thumbnailList.innerHTML = '';

    for (let picture of filterArray) {
        const template = document.querySelector('#thumbnail');

        const img = template.content.querySelector('img');
        img.src = picture.thumbnail;

        const title = template.content.querySelector('.thumbnail__title');
        title.textContent = picture.title;

        const date = template.content.querySelector('.thumbnail__date');
        date.textContent = picture.time;

        const description = template.content
            .querySelector('.thumbnail__description');
        description.textContent = picture.details;

        const li = template.content.querySelector('li');
        li.id = picture.id;

        const clone = document.importNode(template.content, true);

        thumbnailList.appendChild(clone);
    }
};

const toggleModalVisibility = () => {
    if (modal.style.visibility == 'visible') {
        modal.style.visibility = 'hidden';
    } else {
        modal.style.visibility = 'visible';
    }
};

const openModal = (event) => {
    toggleModalVisibility();
    const closeButton = document.querySelector('#modal-close');
    closeButton.addEventListener('click', toggleModalVisibility, false);

    const id = parseInt(event.target.parentElement.getAttribute('id'), 10);

    const img = modal.querySelector('.modal__image');
    const dataObj = filterArray.find((picture) => picture.id === id);

    img.src = dataObj.image;

    const coordinates = dataObj.coordinates;

    map.setCenter(coordinates);
};

const sortArray = (category) => {
    if (category !== 'reset') {
        filterArray = picArray.filter((picture) => {
            return picture.category === category;
        });
    } else {
        filterArray = picArray;
    }

    initThumbnails();
};

const toggleDate = () => {
    const dates = document.querySelectorAll('.thumbnail__date');

    dates.forEach((date) => {
        date.classList.toggle('hidden');

        if (date.classList.contains('hidden')) {
            displayDateBtn.textContent = 'Date on';
        } else {
            displayDateBtn.textContent = 'Date off';
        }
    });
};

const getData = () => new Promise((resolve, reject) => {
    const request = new Request('./data.json');

    fetch(request)
        .then((res) => {
            resolve(res.json());
        }).catch((err) => {
            reject(err);
        });
});


const init = () => {
    getData()
        .then((res) => {
            picArray = res;
            filterArray = picArray;
            initThumbnails();

            const buttons = document.querySelectorAll('.thumbnail__button');
            buttons.forEach((button) => {
                button.addEventListener('click', openModal, false);
            });

            sortGirlfriendBtn.addEventListener('click', () => {
                sortArray('Girlfriend');
            }, false);

            sortWifedBtn.addEventListener('click', () => {
                sortArray('Wife');
            }, false);

            sortResetBtn.addEventListener('click', () => {
                sortArray('reset');
            }, false);

            displayDateBtn.addEventListener('click', toggleDate, false);
        }).catch((err) => console.log(err));
};

init();
