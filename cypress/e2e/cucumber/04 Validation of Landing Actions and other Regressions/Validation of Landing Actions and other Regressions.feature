@e2e @grep2
Feature: 04 - Validation of Landing Actions via UI and API

# Landing QR Code test
# Read QR code from the UI and API

Scenario: As a user, I want to play a Landing that has a QR code enabled and validate it through UI and API
    Given I login creating Onboarding QR Landing via API
    And I visit the QR Landing
    Then I should see the QR code in the UI and the API response

# Landing with Query Selector
# Create / Read

Scenario: As a user, I want to include and use a random Query Selector in a Landing and validate it through UI and API
    Given I login creating a Landing via API
    When I add the random Query Selector to the Landing URL
    Then I should validate the Query Selector in the UI and API response

# Preview Landing
# Create / Read preview message

Scenario: As a user, I want to visit a Landing in Preview mode and validate it through UI
    Given I login creating a Preview Landing via API
    When I visit the Landing
    Then I should validate the preview URL and messages on the top of the landing

# Landing actions / Publish, Unpublish, Duplicate, Delete
# Publish and Unpublish Landings

Scenario: As a user, I want to 'Publish' a Landing and validate it through UI and API
    Given I login creating a unpublished Landing via API
    When I publish the Landing
    Then I should see the Landing published and warning in the UI and the API response

Scenario: As a user, I want to 'Unpublish' a Landing and validate it through UI and API
    Given I login creating a published Landing via API
    When I unpublish the Landing
    Then I should see the Landing unpublished in the UI and the API response

# Duplicate

Scenario: As a user, I want to 'Duplicate' a Landing and validate it through UI and API
    Given I login creating a published Landing via API
    When I duplicate the Landing
    Then I should see the duplicated Landing in the UI and validate the API response

# Delete

Scenario: As a user, I want to 'Delete' a Landing and validate it through UI and API
    Given I login creating a unpublished Landing via API
    When I delete the Landing
    Then I should see the Landing was sucessfully deleted in the UI and the API response