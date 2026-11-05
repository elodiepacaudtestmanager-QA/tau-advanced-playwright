import { test } from '../fixtures/bookStore-fixture';
//import { APIRequestContext, Page } from '@playwright/test';
//import baseAPIUrl from '../../utils/environmentBaseUrl';
//import deleteBookAPIRequest from '../../api/requests/delete-books-collection';
//import userData from '../../data/user-data';

test.describe.configure({ mode: 'serial' });


test.describe('BookStore search - Fixture', () => {

    test('Search for one book', async ({ page, bookStorePage }) => { //first thing that will happen is to call the fixture automatically. whenever the fixture has a "use" it goes back to the test and then go back to the fixture again when the test is done and execute any remaining commands
        await bookStorePage.fillSearch('You Don\'t Know JS');
        await bookStorePage.submitSearch();
        await bookStorePage.checkResultsCount(1);
        await bookStorePage.checkBookTitle('You Don\'t Know JS');
    });


    test('Search for multiple books', async ({ page, bookStorePage }) => {
        await bookStorePage.fillSearch('Java');
        await bookStorePage.submitSearch();
        await bookStorePage.toBeGreaterThan(1);
        await bookStorePage.checkResultsContain('Java');
    });

    test('Search for a non-existing book', async ({ page, bookStorePage }) => {
        await bookStorePage.fillSearch('playwright');
        await bookStorePage.submitSearch();
        await bookStorePage.checkResultsCount(0);
    });

})
/**
 * 1. import the fixture file instead of the @playwright/test
 * 2. as soon as you use "bookStorePage" as a param of the test, 
 *  the fixture will be called 
 * 3. In the fixture file, will create the POM
 * 4. Next step in the fixture is the function "use",
 *  so it goes back to the test file
 * 5. In the test file, it will execute all the commands,
 * 6. As the test ends, it goes back to the fixture
 *  and executes the first intruction after the "use"
*/