@skip
Feature: 07 - CRUDs validations of SDK widgets that require mandatory configuration via UI and API

# Voice widget broken ATM

Background:
    Given I login to Builder creating a SDK flow in the UI

# Read

Scenario: As a user, I want to see the mandatory configurations of SDK widgets
    When I select all widgets
    Then I see the required configurations for the selected widgets via UI

# Create and Update

Scenario: As a user, I want to create and update a SDK flow, saving it and validating through UI and API
    When I select all widgets
    And I fill all the mandatory fields
    Then I save the flow, validating through UI and API

# Delete at UI level

Scenario: As a user, I want to delete a SDK flow via UI, validating through API level
    When I select all widgets, filling all the mandatory fields
    And I save the flow
    * I go back to homepage and delete the flow
    Then I validate the flow was deleted via UI and API

# Delete also happenns at API level at end of each test