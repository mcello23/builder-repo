@skip
Feature: 05 - Validation of CRUDs operations in SDK customizations via API and UI
    
Background:
    Given I login to Builder creating a SDK flow

# Read

Scenario: As a user, I want to see the color customization options via UI and API
    Then I see SDK colors, button roundness and dark themes options, validating UI and API calls

# Preview tests

Scenario: As a user, I want to edit 'Button Roundness' option, validating the preview via UI
    And I set button roundness to "510"
    Then I see the roundness previewed on the right side of the screen

Scenario: As a user, I want to turn on and off the light and dark themes and validate through UI
    And I turn on dark theme mode
    Then I see the dark theme mode was applied

# Create and save

Scenario: As a user, I want to complete a happy path of SDK customization, validating operations via UI and API
    When I customize some colors
    Then I see them reflected on the right side of the screen
    And I save the changes validating through UI and API

# Update and save

Scenario: As a user, I want create a SDK flow, update it and validate the changes via UI and API
    When I customize some colors and save the changes
    But I go back to the saved flow
    And I edit many colors and validate them
    Then I save the updated flow, validating through UI and API

# Delete already happening at API level at end of each test