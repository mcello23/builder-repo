@e2e @grep3
Feature: 06 - Validation of happy paths of Landings and SDK via API and UI

# Landing 
# Customization

Scenario: As a user, I want to manually customize the colors of a Landing and validate via API and UI
    Given I login to Builder as a user
    When I create a Landing flow with community template
    And I customize the colors of the Landing
    Then I validate via UI and API the customization was successfully saved

# Landing 
# Connect

Scenario: As a user, I want to manually connect a Landing and validate via API and UI
    Given I login to Builder as a user
    When I create a Landing flow with community template
    And I customize the colors of the Landing
    * I connect the Landing
    Then I validate via UI and API the connection was successfully saved

# Landing
# Happy Path // Configure landing URL 

Scenario: As a user, I want to manually complete the Landing Happy Path, configuring URL and validating via API and UI
    Given I login to Builder as a user
    When I create a Landing flow with community template
    And I customize the colors of the Landing
    * I connect the Landing
    And I configure the Landing URL
    Then I validate via UI and API the configuration was successfully saved

# SDK
# Customization
# Awaiting fix from CS to arrive

# Scenario: As a user, I want to manually create a SDK flow and customize the colors, validating via API and UI
#     Given I login to Builder as a user
#     When I create a SDK flow
#     And I customize the colors of the SDK
#     Then I validate via UI and API the SDK customization was successfully saved

# # SDK
# # Happy Path // Connect SDK

# Scenario: As a user, I want to manually create a SDK flow, customize the colors and connect it, validating via API and UI
#     Given I login to Builder as a user
#     When I create a SDK flow
#     And I customize the colors of the SDK
#     * I connect the SDK
#     Then I validate via UI and API the SDK connection was successfully saved

# # Landing Statuses

# Scenario: As a user, I want to validate all four Landing status "Draft", "To Be Published", "Pending", "Published" in the API and UI
#     Given I login to Builder with four Landing with different status created via API
#     Then I validate via UI and API the Landing statuses are correctly shown

# # SDK Statuses

# Scenario: As a user, I want to validate all four SDK status "Draft", "To Be Published", "Pending", "Published" in the API and UI
#     Given I login to Builder with four SDKs with different status created via API
#     When I am at the SDKs homepage
#     Then I validate via UI and API the SDK statuses are correctly shown

# # SDK Special Properties
# # Auomatic and Tracking

# Scenario: As a user, I want to validate my SDK has the properties Automatic and Tracking enabled via API
#     Given I login to Builder creating SDK with Enable Tracking and Automatic properties via API
#     Then I validate via UI and API the Tracking and Automatic SDKs properties are correctly saved