Feature: Manage trips
  In order to go around the world
  As an registered user 
  I want to plan my trip
  
  Scenario: Register new trip
    Given I am logged in 
    And I am on the new trip page
    When I fill in "title" with "World Trip"
    And I press "create"
    Then I should see the created trip page with the name "World Tour"