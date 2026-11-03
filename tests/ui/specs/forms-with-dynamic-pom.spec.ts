import { test } from '@playwright/test';
import FormsPage from '../pages/forms-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

let formsPage: FormsPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session

test.beforeEach(async ({ page }) => {
    formsPage = await hooks.beforeEach(page, FormsPage, pages.formsPage);
});
  
test.describe('Forms - Dynamic Page Object Model', () => {
    test('Fill the forms', async () => {
        const studentData = {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            gender: 'Female' as const,
            mobileNumber: '1234567890',
            dateOfBirth: '01 Jan 1990',
        };
        // Compléter le formulaire avec les données de l'étudiant
        await formsPage.fillFirstName(studentData.firstName);
        await formsPage.fillLastName(studentData.lastName);
        await formsPage.fillEmail(studentData.email);
        await formsPage.selectGender(studentData.gender);
        await formsPage.fillMobileNumber(studentData.mobileNumber);
        await formsPage.fillDateOfBirth(studentData.dateOfBirth);
        await formsPage.submitForm();
        // Vérifier la soumission du formulaire
        await formsPage.checkConfirmationModalIsVisible();
        await formsPage.checkConfirmationModalTitle('Thanks for submitting the form');
        await formsPage.checkConfirmationModalInformation(studentData.firstName + ' ' + studentData.lastName, studentData.email, studentData.gender, studentData.mobileNumber);
    });
});
