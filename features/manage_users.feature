Feature: Manage user
  In order to manage trips
  As an user
  I want to be a register
  
  Scenario: Register a new user
    Given I am on the signup page
    When I fill in "Username" with "xiplias"
    And I fill in "Password" with "tetris"
    And I fill in "Password Confirmation" with "tetris"
    And I press "Submit"
    Then I should be created as a new user
    
  Scenario: Login as an user
    Given I am on the login page
    When I fill in "Username" with "xiplias"
    And I fill in "Password" with "tetris"
    And I press "Submit"
    Then I should be logged in