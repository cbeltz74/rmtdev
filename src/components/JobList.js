import {
    BASE_API_URL,
    RESULTS_PER_PAGE, 
    state,
    jobListSearchEl,
    jobListBookmarksEl,
    jobDetailsContentEl,
    getData,
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';


const renderJobList = (whichJobList = 'search') => {

    //determine correct selector for job list (search results list or bookmarks job list)
    const jobListEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;

    // remove previous job items
    jobListEl.innerHTML = '';


    // determine job items that should be rendered
    let jobItems;
    if (whichJobList === 'search') {
        jobItems = state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE);
    } else if (whichJobList === 'bookmarks') {
        jobItems = state.bookmarkJobItems;
    }

    jobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE).forEach(jobItem => {
        const newJobItemHTML = `                
        <li class="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''} ">
            <a class="job-item__link" href="${jobItem.id}">
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobItem.title}</h3>
                    <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                    <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
            </a>
        </li>
    `;
    jobListEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
};

// --- JOB LIST COMPONENT

const clickHandler = async event => {
    // prevent default behavior of trying to navigate to page using href
    event.preventDefault();

    // get job item in list that was clicked.
    const jobItemEl = event.target.closest('.job-item');

    // remove active class from previously active job items
    // updated querySelector to querySelectorAll and removed question mark
    // Added forEach to go over each item and remove job-item--active class
     document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));
    

    // empty the job details section
    jobDetailsContentEl.innerHTML = '';

    // render spinner
    renderSpinner('job-details');

    // We are getting the id of the which is stored in the href tag.
    const id = jobItemEl.children[0].getAttribute('href');

    // update state

    // create array with searchJobItems and bookmarkJobItems
    const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id);

    // render search job list
    renderJobList();

    // add id to url
    history.pushState(null, '', `/#${id}`);

    try {
        // fetch job item data
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);

        // extract jobItems
        const { jobItem } = data;
        
        // remove spinner
        renderSpinner('job-details');

        // render job details            
        renderJobDetails(jobItem);
        
    } catch {
        renderSpinner('job-details');
        renderError(error.message);
    }
};

jobListSearchEl.addEventListener('click', clickHandler);

jobListBookmarksEl.addEventListener('click', clickHandler);

export default renderJobList;