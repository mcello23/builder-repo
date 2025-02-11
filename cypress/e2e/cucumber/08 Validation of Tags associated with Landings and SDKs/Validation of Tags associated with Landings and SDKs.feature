@smoke @grep3
Feature: 08 - Validation of TAGs CRUDs operations related to mobile SDKs and Landings via API and UI

# Insert / Read SDK tag
@skip
Scenario: As a user, I want to search for a SDK with one or two tags and validate it through UI and API
    Given I login to Builder with a SDK flow and TAG created via API
    And I search for a SDK with the tag "TEST"
    Then I am able to see the SDK with the tag 
    And I search for the tag "DEV" 
    Then I am able to see the SDK with two tags, validating through UI and API

# Update / Manual flow SDK tag
@skip
Scenario: As a user, I want add a tag to a SDK flow, save it and validate through UI and API
    Given I login to Builder with a SDK flow and TAG created via API
    When I go to SDK homepage
    And I am able to add a custom TAG
    Then I validate the TAG is saved via API and UI

# Delete SDK tag
@skip
Scenario: As a user, I want to remove a tag from a SDK flow, save it and validate through UI and API
    Given I login to Builder with a SDK flow and TAG created via API
    When I go to SDK homepage
    And I am able to remove a custom TAG
    Then I validate the TAG is removed via API and UI

# Insert / Read Landing tag

Scenario: As a user, I want to search for a Landing with one or two tags and validate it through UI and API
    Given I login to Builder with a Landing flow and TAG created via API
    And I search for a Landing with the tag "TEST"
    Then I am able to see the Landing with the tag
    And I search for the tag "DEV" 
    Then I am able to see the Landing with two tags, validating through UI and API

# Update / Manual flow Landing tag

Scenario: As a user, I want add a tag to a Landing flow, save it and validate through UI and API
    Given I login to Builder with a Landing flow and TAG created via API
    When I open my landing details
    And I am able to add a custom TAG
    Then I validate the TAG is saved via API and UI

# Delete Landing tag

Scenario: As a user, I want to remove a tag from a Landing flow, save it and validate through UI and API
    Given I login to Builder with a Landing flow and TAG created via API
    When I open my landing details
    And I am able to remove a custom TAG
    Then I validate the TAG is removed via API and UI
