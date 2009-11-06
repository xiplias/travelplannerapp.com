Feature: Manage Itineraries
  In order to go around the world
  As an registered user 
  I want to manage my itineraries
  
  Scenario: Create a new itinerary
    #Given I am logged in 
    And I am on the new itinerary page
    When I fill in "title" with "Around the world"
    And I press "Submit"
    Then I should see "Around the world itinerary successfully created."
    
  Scenario: Delete an itinerary
    #Given I am logged in
    And I am on the itinerary page
    When I press "Destroy"
    Then I should see "Successfully deleted itinerary."
