import {
    RESULTS_PER_PAGE,
    state,
    paginationEl,
    paginationBtnBackEl,
    paginationBtnNextEl,
    paginationNumberBackEl,
    paginationNumberNextEl
} from '../common.js';

const renderPaginationButtons = () => {
    // display back button if we are on page 2 or further
    if (state.currentPage >= 2) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden'); // no dot need in class name because we are using .classList on element.
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden'); 
    }

    // display the next button if there are more job items on next page.
    if ((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add('pagination__button--hidden'); // no dot need in class name because we are using .classList on element.
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden'); 
    }

    // update page numbers
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    // unfocus or blur buttons
    paginationBtnBackEl.blur();
    paginationBtnNextEl.blur();
};


import renderJobList from './JobList.js';

const clickHandler = event => {
    // we want to get the closet element with the class pagination__button when the user clicks the area.
    const clickedButtonEl = event.target.closest('.pagination__button');

    // stop function if null (if user clicked inbetween buttons)
    if (!clickedButtonEl) return;

    // check if intention is next or back
    const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

    // update state of current page
    nextPage ? ++state.currentPage : state.currentPage--;

    // render job items for the page
    renderJobList();

    // render pagination buttons
    renderPaginationButtons();
};

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;