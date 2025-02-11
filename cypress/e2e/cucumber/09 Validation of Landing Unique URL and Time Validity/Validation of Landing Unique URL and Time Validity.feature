@e2e @grep4
Feature: 09 - Validation of Landing API for time expiration and uniqueness

Background:
    Given I login to Builder with a specific Landing Published via API

Scenario: As a user, I want to validate my unique URL with negative time expiration
    Then I validate my Landing URL is unique and time validity is negative

Scenario: As a user, I want to validate my unique URL with time expiration of 1 second
    Then I validate my Landing URL is unique and time validity is 1 second

Scenario: As a user, I want to validate my unique URL with time expiration of 1 minute
    Then I validate my Landing URL is unique and time validity is 1 minute