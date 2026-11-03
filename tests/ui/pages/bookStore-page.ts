import { type Page, type Locator , expect } from '@playwright/test';



class BookStorePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;

  
  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Type to search');
    this.searchButton = this.searchInput.locator('xpath=..').getByRole('button');
    this.searchResults = page.locator('tbody tr');
  }


    async fillSearch(searchTerm: string) {
      await this.searchInput.fill(searchTerm);
    }

    async submitSearch() {
      await this.searchButton.click();
   }

   async resetSearch() {
    await this.searchInput.fill('');
    await this.searchButton.click();
   }

   async checkResultsCount(expectedCount: number) {
    const actualCount = await this.searchResults.count();
    expect(actualCount).toBe(expectedCount);
   }

   async checkBookTitle(expectedTitle: string) {
    const bookTitle = this.page.getByRole('link', { name: expectedTitle, exact: true });
    const actualTitle = await bookTitle.textContent();
    expect(actualTitle?.trim()).toBe(expectedTitle);
   }

}
export default BookStorePage;