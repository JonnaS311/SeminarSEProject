Feature: Delete a task

  Scenario: Delete an existing task
    Given there is a task with title "Review code"
    When I delete the task
    Then the task should no longer be available in the system
