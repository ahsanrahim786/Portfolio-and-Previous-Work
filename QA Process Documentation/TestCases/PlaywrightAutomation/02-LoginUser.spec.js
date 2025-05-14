import {test, expect} from '@playwright/test';

//Helper function to open the site & click on Signup / Login
const openSite = async (page) => {
    await page.goto('https://automationexercise.com/', {waitUntil: "networkidle"});
    await expect(page).toHaveTitle('Automation Exercise');
    await page.getByRole('link', {name: " Signup / Login"}).click();
    await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
};

//Helper function to enter credentials & click on Login button
const loginSite = async (page, email, password) => {
    await page.locator('.login-form').waitFor({state: "visible"});
    await page.locator("//div[@class='login-form']//input[@name='email']").fill(email);
    await page.locator("//input[@name='password']").fill(password);
    await page.getByRole('button', {name: "Login"}).click();
};

//Helper function to logout from the site
const logoutSite = async (page) => {
    await page.getByRole('link', {name: "Logout"}).click();
    await expect(page).toHaveURL('https://automationexercise.com/login');
};

test.describe('Automation Experience Tests', () => {

    //This function will be executed before each test
    test.beforeEach(async ({page}) => {
        await openSite(page);
    });

    //test case 01
    test('Login with Valid Email & Password', async ({page}) => {
        //Enter Credentials
        await loginSite(page, 'corygibes01@email.com', 'Cube@123');

        //Logout
        await logoutSite(page);       
    });

    //test case 02
    test('Login with Invalid Email & Valid Password', async ({page}) => {
        //Enter Credentials
        await loginSite(page, 'corygibes02@email.com', 'Cube@123');
        await page.locator("//p[.='Your email or password is incorrect!']").waitFor({state: "visible"});
        await expect(page).toHaveURL('https://automationexercise.com/login');
    });

    //test case 03
    test('Login with Valid Email & Invalid Password', async ({page}) => {
        //Enter Credentials
        await loginSite(page, 'corygibes01@email.com', 'Cube@125');
        await page.locator("//p[.='Your email or password is incorrect!']").waitFor({state: "visible"});
        await expect(page).toHaveURL('https://automationexercise.com/login');
    });

    //test case 04
    test('Login with Invalid Email & Password', async ({page}) => {
        //Enter Credentials
        await loginSite(page, 'corygibes02@email.com', 'Cube@125');
        await page.locator("//p[.='Your email or password is incorrect!']").waitFor({state: "visible"});
        await expect(page).toHaveURL('https://automationexercise.com/login');
    });
});