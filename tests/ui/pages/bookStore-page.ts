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


  // Remplit le champ de recherche avec le terme fourni.  
  async fillSearch(searchTerm: string) {
      await this.searchInput.fill(searchTerm);
    }
  // Soumet la recherche en cliquant sur le bouton de recherche.
  async submitSearch() {
    await this.searchButton.click();
   }
  // Réinitialise la recherche en effaçant le champ de recherche et en soumettant une recherche vide.
  async resetSearch() {
    await this.searchInput.fill('');
    await this.searchButton.click();
   }

  // Vérifie le nombre de résultats de recherche.
  async checkResultsCount(expectedCount: number) {
    const actualCount = await this.searchResults.count();
    expect(actualCount).toBe(expectedCount);
   }

  // Vérifie le titre d'un livre.
  async checkBookTitle(expectedTitle: string) {
    const bookTitle = this.page.getByRole('link', { name: expectedTitle, exact: true });
    const actualTitle = await bookTitle.textContent();
    expect(actualTitle?.trim()).toBe(expectedTitle);
   }

  // Vérifie que le nombre de résultats de recherche est supérieur à un certain nombre.
  async toBeGreaterThan(expectedCount: number) {
    const actualCount = await this.searchResults.count();
    expect(actualCount).toBeGreaterThan(expectedCount);
   } 
   
  // Vérifie que chaque résultat de recherche contient le terme de recherche fourni.
  async checkResultsContain(searchTerm: string) {
    const resultsCount = await this.searchResults.count();
    for (let i = 0; i < resultsCount; i++) {
      const resultText = await this.searchResults.nth(i).textContent();
      expect(resultText?.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
  }

}
export default BookStorePage;