import { test, expect, APIRequestContext } from '@playwright/test';
import baseAPIUrl from '../../utils/environmentBaseUrl';
import deleteBookAPIRequest from '../../api/requests/delete-books-collection';
import addBookAPIRequest from '../../api/requests/create-books-collection';
import userData from '../../data/user-data';

let apiContext: APIRequestContext;
const env = process.env.ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME_API!;

test.beforeAll(async ({ playwright }) => {
    
    apiContext = await playwright.request.newContext({
        baseURL: baseAPIUrl[env].api,
        extraHTTPHeaders: {
            // Authorization: `Basic ${apiToken}`,
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            // Authorization: `Basic ${env}`,
            Accept: 'application/json',
        },
    });
    
    const response = await apiContext.post('/Account/v1/Authorized', {data: { userName, password },});
    expect(response.ok()).toBeTruthy();
    const isAuthorized: boolean = await response.json();
    expect(isAuthorized).toBe(true);
});

test.describe('Books - API Only', () => {

    test('Add new book and delete it', async () => { 
        // Clean up any existing books for the user
        const deleteAllResponse = await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
        expect(deleteAllResponse.status()).toBe(204);

        // Add a new book to the collection
        const bookToAdd = [userData.books.new];
        const addResponse = await addBookAPIRequest.addBookToCollection(apiContext, userId, bookToAdd);
        expect(addResponse.status()).toBe(201);

        // Delete the book
        const deleteResponse = await deleteBookAPIRequest.deleteBookAPIByIsbn(apiContext, userId, userData.books.new);
        expect(deleteResponse.status()).toBe(204);
    });

    test('Add several books', async () => { 
        // Clean up any existing books for the user
        const deleteAllResponse = await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
        expect(deleteAllResponse.status()).toBe(204);

        // Add several books to the collection
        const booksToAdd = [userData.books.new, userData.books.duplicate];
        const addResponse = await addBookAPIRequest.addBookToCollection(apiContext, userId, booksToAdd);
        expect(addResponse.status()).toBe(201);
    });

});


test.afterAll(async () => {
  await apiContext?.dispose();
});