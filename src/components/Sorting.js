import {
    state,
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';

import renderJobList from './JobList.js';

const handleClick = event => {
    // get clicked button element
    const clickedButtonEl = event.target.closest('.sorting__button');
    
    // stop function if no clicked button element
    if (!clickedButtonEl) return;

    // check if recent or relevant sorting. True = RECENT. False = RELEVANT
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    // make sorting button look active
    if (recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    // sort job items
    if (recent) {
        // how [].sort works: return positive number to sort b higher than a, return negative number to sort a higher than b, return 0 to stay same
        state.searchJobItems.sort((a ,b) => {
           return a.daysAgo - b.daysAgo; // e.g. if a.daysAgo = 10 and b.daysAgo = 5, then b is more recent. b should be higher than a. return a positive number.
        });      
    } else {
        state.searchJobItems.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore; // e.g. if a.relevanceScore = 94 and b.relevanceScore = 78, then a is more relevant that b. Return a negative number. (b-a).
        });
    }

    // render in sorted state
    renderJobList();

};

sortingEl.addEventListener('click', handleClick);