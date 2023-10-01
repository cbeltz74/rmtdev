import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';

import renderJobList from './JobList.js';

// adding eventListner here will capture click anywhere on job details area, not just bookmark button. if class contains bookmark, the user means to bookmark the item.
// event.target gives us the class of the html element that was clicked.
const clickHandler = event => {
    // don't continue if click was outside bookmark button
    if (!event.target.className.includes('bookmark')) return;

    // update state
    if (state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id);
    } else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }

    // persist data with local storage need to convert to string
    localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));
    
    // update bookmark icon to blue
    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');
};

const mouseEnterHandler = () => {
    // make bookmareks button look active
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    // make job list visible
    jobListBookmarksEl.classList.add('job-list--visible');

    // render bookmarks job list
    renderJobList('bookmarks');
};

const mouseLeaveHandler = () => {
    // make bookmareks button look inactive
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');

    // make job list invisible
    jobListBookmarksEl.classList.remove('job-list--visible');

};
jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);