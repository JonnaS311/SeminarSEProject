Feature: Change the state of a task

  Scenario: Move a task from "todo" to "doing"
    Given there is a task with title "Test endpoints" in state "todo"
    When I change the state of the task to "doing"
    Then the new state of the task should be "doing"

  Scenario: Move a task from "doing" to "done"
    Given there is a task with title "Write unit tests" in state "doing"
    When I change the state of the task to "done"
    Then the new state of the task should be "done"
