@smoke @e2e @grep1
Feature: 01 - Validation of Basic funcionalities of Builder: Login/logout, Tutorial, Landing/SDK buttons, Landing API Versions, User/Owner roles and more

# Login/Logout

Scenario: As a user, I want to sucessfully login to Builder
    Given I open the login page
    When I enter valid credentials
    Then I see that I am logged in both in UI and API

Scenario: As a user, I want to sucessfully logout of Builder
    Given I login to Builder as a user
    When I click on the log out button
    Then I see that I am logged out in the UI, validating the URL

# Tutorial flows

Scenario: As a user, I want to see the tutorial flow when logged in 
    Given I login to Builder as a user
    When I click on the tutorial flow
    Then I see the entire tutorial messages via UI

# Landing and SDK buttons

Scenario: As a first time user, I want to see the Landing and SDK buttons
    Given I login to Builder as a user
    Then I see the Landing and SDK buttons in the Homepage via UI

Scenario: As a first time user, I want to see the Landing pre-defined templates
    Given I login to Builder as a user
    When I click on Landing button
    Then I see pre-defined templates to create a Landing

Scenario: As a first time user, I want to see the SDK options
    Given I login to Builder as a user
    When I click on SDK button
    Then I see the available fields to create a SDK

# Tags basic functionalities

Scenario: As a user, I want to use the dropdown Tags selector an validate it works in the UI
    Given I login with a draft Landing created via API
    When I click on the "Tags" tab, selecting the last tag available
    Then I validate that the dropdown works

# Search maintained

Scenario: As a user, I want to use the search field and see that it's maintained between pages
    Given I login with a draft Landing created via API
    When I perform a search on Landing and SDK pages
    Then I can see the search is maintained in both pages

# Design Studio display    

Scenario: As a user, I want to validate that Design Studio display is shown in fullscreen
    Given I login to Builder as a user
    When I create a Landing to enter Design Studio
    Then I should see that the display is shown in fullscreen

# Landing API Versions
# SDK validation changed, awaiting new method for testing
Scenario: As a user, I validate SelphidWebComponent: '6.6.1' and SelphiWebComponent: '6.6.1' versions used in Landing
    Given I login to Builder, with a pre-defined Onboarding landing set
    When I visit the Landing
    Then I validate the correct versions of the APIs used in Landing using a GET request

# # Validation of owner/user roles 

Scenario: Logged as a "owner" role, I want to open "My Profile" and see the enabled and editale fields
    Given I login to Builder as a owner
    When I click on "My Profile > Edit"
    Then I am able to edit my name, surname, role, clients and types

Scenario: Logged as a "owner" role, I want to open "User management" option and see all fields
    Given I login to Builder as a owner
    When I click on "User management" button on the top right corner
    Then I validate "Users", "Groups" fields and "Create" button via UI and API request

Scenario: Logged as a "user" role, I want to open "My Profile" and see the enabled and editale fields
    Given I login to Builder as a user
    When I click on "My Profile > Edit"
    Then I am able to edit my name and surname