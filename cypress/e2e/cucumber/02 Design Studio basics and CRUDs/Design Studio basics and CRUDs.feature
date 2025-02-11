@e2e @grep1
Feature: 02 - Validation of Design Studio basics and CRUD operations via API and UI

# Read (Landing)

Scenario: As a Builder user, I want to see all the widgets inside Design Studio of Landing
    Given I login to Builder as a user
    When I create a Landing flow
    Then I am able to see all the widgets inside Design Studio
    And I can see other fileds in Design Studio

# Create + Update (Landing)

Scenario: As a Builder user, I want to manually create a Landing in Design Studio and validate via API and UI
    Given I login to Builder as a user
    When I create a Landing flow
    And I add all widgets to the flow
    And I click on the "Save" button
    Then I validate via UI and API the flow was sucessfully created

# Awaiting on CS fix for Selphi Component
# Read (SDK)

# Scenario: As a Builder user, I want to see all the widgets inside Design Studio of SDK
#     Given I login to Builder as a user
#     When I create a Android SDK flow
#     Then I am able to see all SDK widgets inside Design Studio
#     And I can see other SDK fields in Design Studio

# # Create + Update (SDK)

# Scenario: As a Builder user, I want to manually create a SDK in Design Studio and validate via API and UI
#     Given I login to Builder as a user
#     When I create a iOS SDK flow
#     And I add all SDK widgets to the flow
#     * I save the SDK flow
#     Then I validate via UI and API the SDK flow was sucessfully created

# Delete already happening at API level at end of each test