import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';

const handleClick = event => {
    // get clicked button element
    const clickedButtonEl = event.target.closest('.sorting-button');
    
    // stop function if no clicked button element
    if (!clickedButtonEl) return;

    // check if recent or relevant sorting. True = RECENT. False = RELEVANT
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    // sort job items
    if (recent) {

    } else {

    }
};

sortingEl.addEventListener('click', handleClick);