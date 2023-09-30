import { 
    BASE_API_URL,
    state,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';


// --- SEARCH COMPONENT ----

const submitHandler = async event => {
    event.preventDefault();

    const searchText = searchInputEl.value;

    // validation should have on backend also = Regular Expressions
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
            renderError('Your search may not contain numbers');
        return;
    }

        // blur input
        searchInputEl.blur();

        // remove previous job items
        jobListSearchEl.innerHTML = '';

        // reset sorting buttons
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');

        // render spinner
        renderSpinner('search');

        try {
            // fetch search results
            const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    
            // extract jobItems
            const { jobItems } = data;
            
            // update state
            state.searchJobItems = jobItems;
            state.currentPage = 1;

            // remove spinner
            renderSpinner('search');
    
            // render number of results
            numberEl.textContent = jobItems.length;
  
            // render pagination buttons
            renderPaginationButtons();


            // render job items in seach job list
            renderJobList();
        } catch (error) {
            renderSpinner('search');
            renderError(error);
        }
};

searchFormEl.addEventListener('submit', submitHandler);