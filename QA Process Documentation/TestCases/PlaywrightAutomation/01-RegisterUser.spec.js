//const {test, expect} = require ('@playwright/test');
import {test, expect} from '@playwright/test';

test.describe('Automation Ecercise', () => {

    test('Register User', async({page}) => {
        await page.goto('http://automationexercise.com', {waitUntil: "networkidle"});
        await expect(page).toHaveTitle('Automation Exercise');
        await page.getByRole('link', {name: " Signup / Login"}).click();
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
        await page.locator('.signup-form').waitFor({state: "visible"});
        await page.locator("//input[@name='name']").fill('Cory Gibes');
        await page.locator("//div[@class='signup-form']//input[@name='email']").fill('corygibes01@email.com');
        await page.getByRole('button', {name: "Signup"}).click();
        await expect(page).toHaveURL('https://automationexercise.com/signup');
        await page.locator('.login-form').waitFor({state: "visible"});
        //Select Gender from Radio button
        await page.locator('#id_gender1').check();
        await page.locator('#password').fill('Cube@123');
        //select Date of Birth from Dropdown
        await page.selectOption('#days', '10');
        await page.selectOption('#months', 'October');
        await page.selectOption('#years', '1995');
        //Check the checkbox
        await page.locator('#newsletter').check();
        await page.locator('#optin').check();
        
        //Enter Address Information
        await page.locator('#first_name').fill('Cory');
        await page.locator('#last_name').fill('Gibes');
        await page.locator('#company').fill('Cube Private Systems');
        await page.locator('#address1').fill('CB907, Supply');
        await page.locator('#address2').fill('Opp Rawal Motors');
        await page.selectOption('#country', 'Singapore');
        await page.locator('#state').fill('KP');
        await page.locator('#city').fill('New Orleans');
        await page.locator('#zipcode').fill('22010');
        await page.locator('#mobile_number').fill('+923450000251');
        await page.getByRole('button', {name: "Create Account"}).click();
        await expect(page).toHaveURL('https://automationexercise.com/account_created');
        await page.locator('.title').waitFor({state: "visible"});
        await page.getByRole('link', {name: "Continue"}).click();
        await page.locator("//a[contains(.,'Logged in as Cory Gibes')]").waitFor({state: "visible"});

        //Delete Account
        // await page.getByRole('link', {name: " Delete Account"}).click();
        // await expect(page).toHaveURL('https://automationexercise.com/delete_account');
        // await page.locator('.title').waitFor({state: "visible"});
        // await page.getByRole('link', {name: "Continue"}).click();
        // await expect(page).toHaveURL('https://automationexercise.com/');

        //Logout
        await page.getByRole('link', {name: "Logout"}).click();
        await expect(page).toHaveURL('https://automationexercise.com/login');
    });

    //Register User with existing Email
    test('Register user with existing Email', async ({page}) => {
        await page.goto('http://automationexercise.com', {waitUntil: "networkidle"});
        await expect(page).toHaveTitle('Automation Exercise');
        await page.getByRole('link', {name: " Signup / Login"}).click();
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
        await page.locator('.signup-form').waitFor({state: "visible"});
        await page.locator("//input[@name='name']").fill('Gibes Cory');
        await page.locator("//div[@class='signup-form']//input[@name='email']").fill('corygibes01@email.com');
        await page.getByRole('button', {name: "Signup"}).click();
        await page.locator("//p[.='Email Address already exist!']").waitFor({state: "visible"});
        await expect(page).toHaveURL('https://automationexercise.com/signup');
    });
});