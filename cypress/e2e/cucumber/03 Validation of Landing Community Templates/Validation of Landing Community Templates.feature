@e2e @grep2
Feature: 03 - Validation of Landings 'Community Templates' through UI and API

# Community Templates
# CRUDs / Create and Read

Scenario: As a user, I want to create, play and validate the Landing with "Onboarding with Video Recording" template
    Given I login creating Onboarding with Video Recording Landing via API
    When I visit the Landing
    Then I should see that OVR landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Onboarding" template
    Given I login creating Onboarding Landing via API
    When I visit the Landing
    Then I should see that Onboarding landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Form With RENIEC" template
    Given I login creating Form With RENIEC via API
    When I visit the Landing
    Then I should see that Form With RENIEC landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Onboarding Document Validation Results" template
    Given I login creating Onboarding Document Validation Results via API
    When I visit the Landing
    Then I should see that ODV landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Onboarding with Reniec" template
    Given I login creating Onboarding with Reniec via API
    When I visit the Landing
    Then I should see that OWR landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Onboarding with Results" template
    Given I login creating Onboarding with Results via API
    When I visit the Landing
    Then I should see that Onboarding With Results landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Video Contracting" template
    Given I login creating Video Contracting via API
    When I visit the Landing
    Then I should see that Video Contracting landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Onboarding with Document Validation and Video Recording" template
    Given I login creating OWDVVR Landing via API
    When I visit the Landing
    Then I should see that OWDVVR landing has specific properties

Scenario: As a user, I want to create, play and validate the Landing with "Authentication" template
    Given I login creating Authentication Landing via API
    When I visit the Landing
    Then I should see that Authentication landing has specific properties