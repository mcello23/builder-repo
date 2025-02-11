@e2e @grep4
Feature: 10 - Validation of Builder services through Central Services clients CRUDs via UI and API

# Only Mobile SDK enabled

Scenario: As a Builder user, I enable only the 'Mobile SDK' button through Central Services API
    Given I login with a user with 'Mobile SDK Android' enabled on Central Services
    And I only see 'Mobile SDK' button on homepage, and validate the API call
    But I do not see the 'Landing' button in the UI
    Then I validate that 'Mobile SDK' and working on UI and API call by clicking on it

# Only Landing enabled

Scenario: As a Builder user, I enable only the 'Landing' button through Central Services API
    Given I login with a user with 'Landing' enabled on Central Services
    And I only see 'Landing' button on the homepage, and validate the API call
    But I do not see the 'Mobile SDK' button in the UI
    Then I validate that 'Landing' is working on UI and API call by clicking on it

# Both Landing and Mobile SDK enabled

Scenario: As a Builder user, I enable both 'Landing' and 'Mobile SDK' buttons on Central Services API
    Given I login with a user with both 'Landing' and 'SDK' buttons enabled on Central Services
    And I should see both buttons on the homepage, and validate the API call
    Then I validate the UI and API call of 'Mobile SDK' button by clicking on it
    Then I validate the UI and API call of 'Landing' button by clicking on it

# Only Landing but no widgets enabled

Scenario: As a Builder user, I enable 'Landing' button with no widgets through Central Services API
    Given I login with a user with 'Landing' enabled on Central Services
    When I click on the 'Landing' button on the homepage, and create a new flow
    Then I see that there are no 'Landing' widgets available in the UI and API call

# Only Mobile SDK but no widgets enabled

Scenario: As a Builder user, I enable 'Mobile SDK' button with no widgets through Central Services API
    Given I login with a user with 'Mobile SDK Android' enabled on Central Services
    When I click on the 'Mobile SDK' button on the homepage, and create a new flow
    Then I see that there are no 'Mobile SDK' widgets available in the UI and API call

# Only Landing with widgets enabled

Scenario: As a Builder user, I enable 'Landing' button with all widgets through Central Services API
    Given I login with a user with 'Landing and Widgets' enabled on Central Services
    When I click on the 'Landing' button on the homepage, and create a new flow
    Then I see that all 'Landing' widgets are available in the UI and API call

# Only Mobile SDK (iOS) with widgets enabled
@skip
Scenario: As a Builder user, I have enable 'Mobile SDK' with all widgets through Central Services API
    Given I login with a user with 'Mobile SDK and Widgets' enabled on Central Services
    When I click on the 'Mobile SDK iOS' button on the homepage, and create a new flow
    Then I see that all 'Mobile SDK' widgets are available in the UI and API call

# Only Mobile SDK (Android) with all widgets enabled
@skip
Scenario: As a Builder user, I have enable 'Mobile SDK' with all widgets through Central Services API
    Given I login with a user with 'Mobile SDK and Widgets' enabled on Central Services
    When I click on the 'Mobile SDK Android' button on the homepage, and create a new flow
    Then I see that all 'Mobile SDK' widgets are available in the UI and API call

# Delete already happening in the background at each test scenario