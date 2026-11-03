import { type Page, type Locator , expect } from '@playwright/test';

type Gender = 'Male' | 'Female' | 'Other';

class FormsPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly dateOfBirthInput: Locator;
//  readonly subjectsInput: Locator;
//  readonly hobbiesCheckbox: Locator;
//  readonly pictureUploadInput: Locator;
//  readonly currentAddressInput: Locator;
//  readonly stateDropdown: Locator;
//  readonly cityDropdown: Locator;
  readonly submitButton: Locator
  // Elements de la modale de confirmation
  readonly confirmationModal: Locator;
  readonly confirmationModalTitle: Locator;
  readonly confirmationModalStudentName: Locator;
  readonly confirmationModalStudentEmail: Locator;
  readonly confirmationModalGender: Locator;
  readonly confirmationModalMobile: Locator;
  readonly confirmationModalDateOfBirth: Locator;

  
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileNumberInput = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
//    this.subjectsInput = page.locator('#subjectsInput');
//    this.hobbiesCheckbox = page.locator('#hobbies-checkbox-1');
//    this.pictureUploadInput = page.locator('#uploadPicture');
//    this.currentAddressInput = page.locator('#currentAddress');
//    this.stateDropdown = page.locator('#state');
//    this.cityDropdown = page.locator('#city');
    this.submitButton = page.locator('#submit');
    // Elements de la modale de confirmation
    this.confirmationModal = page.locator('.modal-content');
    this.confirmationModalTitle = page.locator('#example-modal-sizes-title-lg');
    this.confirmationModalStudentName = page.locator('//td[text()="Student Name"]/following-sibling::td');
    this.confirmationModalStudentEmail = page.locator('//td[text()="Student Email"]/following-sibling::td');
    this.confirmationModalGender = page.locator('//td[text()="Gender"]/following-sibling::td');
    this.confirmationModalMobile = page.locator('//td[text()="Mobile"]/following-sibling::td');

  }

    async selectGender(gender: Gender) {
      const genderRadioButton = this.page.getByRole('radio', { name: gender, exact: true });
        await genderRadioButton.check();
    }

    async fillFirstName(firstName: string) {
      await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
      await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string) {
      await this.emailInput.fill(email);
    }

    async fillMobileNumber(mobileNumber: string) {
      await this.mobileNumberInput.fill(mobileNumber);
    }

    async fillDateOfBirth(dateOfBirth: string) {
      await this.dateOfBirthInput.fill(dateOfBirth);
    }

    async submitForm() {
      await this.submitButton.click();
   }

   async checkConfirmationModalIsVisible() {
    await expect(this.confirmationModal).toBeVisible();
   }

   async checkConfirmationModalTitle(expectedTitle: string) {
    await expect(this.confirmationModalTitle).toHaveText(expectedTitle);
   }

   async checkConfirmationModalInformation(expectedName: string, expectedEmail: string, expectedGender: string, expectedMobile: string) {
    await expect(this.confirmationModalStudentName).toHaveText(expectedName);
    await expect(this.confirmationModalStudentEmail).toHaveText(expectedEmail);
    await expect(this.confirmationModalGender).toHaveText(expectedGender);
    await expect(this.confirmationModalMobile).toHaveText(expectedMobile);
   }
}
export default FormsPage;