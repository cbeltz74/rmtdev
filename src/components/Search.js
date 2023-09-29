import { 
    BASE_API_URL,
    state,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    getData
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';


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

        // render spinner
        renderSpinner('search');

        try {
            // fetch search results
            const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    
            // extract jobItems
            const { jobItems } = data;
            
            // update state
            state.searchJobItems = jobItems;

            // remove spinner
            renderSpinner('search');
    
            // render number of results
            numberEl.textContent = jobItems.length;
    
            // render job items in seach job list
            renderJobList();
        } catch (error) {
            renderSpinner('search');
            renderError(error);
        }
};

searchFormEl.addEventListener('submit', submitHandler);