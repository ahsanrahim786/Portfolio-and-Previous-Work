//const {test, expect} = require ('@playwright/test');
import {test, expect} from '@playwright/test';

//Helper function to open the site & click on Signup / Login
const openSite = async (page) => {
    await page.goto('https://automationexercise.com/', {waitUntil: "networkidle"});
    await expect(page).toHaveTitle('Automation Exercise');
};

test.describe('Automation Exercise', () => {
    
    test('Contact Us Form', async ({page}) => {
        //Open Site
        await openSite(page);

        //Click on Contact Us
        await page.getByRole('link', {name: " Contact us"}).click();
        await expect(page).toHaveTitle('Automation Exercise - Contact Us');
    })

});