import { 
    BASE_API_URL,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';


// --- SEARCH COMPONENT ----

const submitHandler = event => {
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

        // fetch search results
        fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
            .then(response => {
                if (!response.ok) {
                    console.log('Something went wrong');
                    return;
                }
                return response.json();
            })
            .then(data => {
                const { jobItems } = data; // we are pulling only jobitems out of the database

                // remove spinner
                renderSpinner('search');

                // render number of results
                numberEl.textContent = jobItems.length;
                renderJobList(jobItems);
            })
            .catch(error => console.log(error));
};

searchFormEl.addEventListener('submit', submitHandler);