Feature: Manage user
  In order to manage trips
  As an user
  I want to be a registered user
  
  Scenario: Register a new user
    Given I am on the signup page
    When I fill in "username" with "xiplias"
    And I fill in "password" with "tetris"
    And I press "create"
    Then I should be created as a new user
    
  Scenario: Login as an user
    Given I am on the login page
    And I am a registered user
    When I fill in "user" with "xiplias"
    And I fill in "password"  with "tetris"
    Then I should be logged in