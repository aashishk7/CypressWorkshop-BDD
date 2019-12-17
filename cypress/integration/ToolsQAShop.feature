Feature: Shopping on Tools QA 
I want to shop on Tools QA Shopping Website

Scenario: Placing Order for 2 Shirts

Given I open the Account Page for Tools QA
And I do the registration for my user by entering username as "aashishk17" and email address as "aashish.khetarpal.07@gmail.com" and password as "cypresstutorials"
And I do the assertions for Register Button and Register successfully by entering new password as "cypresstutorials77"
When I do the search for shirts with below specifications
| ShirtSpec  | Size | Color |
| blue denim | 34 | Black |
| playboy | 40 | Grey |
Then I do the verification on the Cart Page that it contains "blue denim" and "playboy" and do the checkout successfully
And I do the login with same credentials used above "aashish.khetarpal.07@gmail.com" and "cypresstutorials"
And I enter all the billing details and then place the order
| BillingFirstName | BillingLastName | StreetAddress | City | PostalCode | Phone |
| Aashish | Khetarpal | 77 | Gurgaon | 122001 | 7777777777 |
And I verify that order has been successfully placed