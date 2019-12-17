import { Given , And , Then , When} from "cypress-cucumber-preprocessor/steps";
import HomePage from '../PageObjects/HomePage';
import CheckoutPage from '../PageObjects/CheckoutPage';
import BillingPage from '../PageObjects/BillingPage';

//Object Creation for PageObject Page Class and assigning it to a constant variable

const homePage=new HomePage();
const checkoutPage= new CheckoutPage();
const billingPage=new BillingPage();
    
//test steps 
Given('I open the Account Page for Tools QA', () => {
cy.visit(Cypress.env('url'));

And('I do the registration for my user by entering username as {string} and email address as {string} and password as {string}', (Username , Email , Password) => {
homePage.getUserName().type(Username);
homePage.getEmail().type(Email);
homePage.getPassword().type(Password);
})

And ('I do the assertions for Register Button and Register successfully by entering new password as {string}', (NewPassword) => {
//homePage.getRegisterButton().should('have.attr','disabled','disabled');
//homePage.getRegisterButton().should('be.disabled');
//homePage.getPassword().type(NewPassword);
homePage.getRegisterButton().click();
})

When ('I do the search for shirts with below specifications', datatable => {
    datatable.hashes().forEach(row => {
    cy.selectProduct(row.ShirtSpec,row.Size,row.Color);
    })
})

Then ('I do the verification on the Cart Page that it contains {string} and {string} and do the checkout successfully' , (ProductText1 , ProductText2) => {
    //End to End Test Completion including Checkout and Placing Order
    checkoutPage.getCartButton().click();
    //Validate if the items we added are successfully there in the cart using should and expect together.
    checkoutPage.getProducts().should(($p) => {
    expect($p).to.have.length(2); // There should be 2 items in cart.
    expect($p.first()).to.contain(ProductText1); // First Element should have blue denim
    expect($p).to.contain(ProductText2); // Verifying that playboy shirt should also be there
    });
    checkoutPage.getCheckoutButton().click();
})

And ('I do the login with same credentials used above {string} and {string}',(Email , Password) => {
    billingPage.getShowLogin().click();
    billingPage.getLoginUserName().type(Email);
    billingPage.getLoginPassword().type(Password);
    billingPage.getLoginButton().click();
})

And ('I enter all the billing details and then place the order', datatable => {
    datatable.hashes().forEach(row => {
    billingPage.getBillingFirstName().clear().type(row.BillingFirstName);
    billingPage.getBillingLastName().clear().type(row.BillingLastName);
    billingPage.getBillingAddress().clear().type(row.StreetAddress);
    billingPage.getStateDropdown().click().then(function(){
        billingPage.getStateSearchBox().clear().type('Haryana').type('{enter');
    });
    billingPage.getBillingCity().clear().type(row.City);
    billingPage.getBillingPostCode().clear().type(row.PostalCode);
    billingPage.getBillingPhone().clear().type(row.Phone);

    //Placing the Order button click by selecting the checkbox

    billingPage.getTermsCheckbox().click();
    billingPage.getPlaceOrderButton().click();
})
})

And ('I verify that order has been successfully placed',() => {
    billingPage.getOrderPlacedText().then(function(element){
    expect(element.text().includes("Thank you")).to.be.true;
})
})

})
