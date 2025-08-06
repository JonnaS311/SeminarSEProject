Feature: Create a new task

  Scenario: Create a valid task with all required fields
    Given I am a project manager
    When I create a task with title "Document API", description "Write Swagger documentation", date "2025-08-06", state "todo", priority true, assigned to "Juan", color "#FF5733" and manager_id 1
    Then the task should be created successfully
    And the task title should be "Document API"
    And the priority should be true
