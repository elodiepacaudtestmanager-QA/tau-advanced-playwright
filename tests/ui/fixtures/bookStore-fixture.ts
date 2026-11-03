import { test as base } from '@playwright/test';
import BookStorePage from '../pages/bookStore-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

type MyFixtures = {
  bookStorePage: BookStorePage;
}

export const test = base.extend<MyFixtures>({

  bookStorePage: async ({ page }, use) => {
    // Prépare la page et crée le Page Object.
    const bookStorePage = await hooks.beforeEach(page, BookStorePage, pages.bookStorePage);
    // Le test reçoit le Page Object et s'exécute.
    await use(bookStorePage);
    // Après le test, efface le filtre pour rétablir la liste.
    await bookStorePage.resetSearch();
    
  },
});

export { expect } from '@playwright/test';