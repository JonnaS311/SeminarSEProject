"""Acceptance test for adding a new task."""
import requests
from behave import given, when, then

API_URL = "http://127.0.0.1:8000"


@given("I am a project manager")
def step_impl(context):
    """Define who the manager is."""
    context.manager_id = 1


@when(
    'I create a task with title "{title}", description "{description}", date "{date}", '
    'state "{state}", priority {priority}, assigned to "{assignee}", color "{color}" '
    'and manager_id {manager_id:d}'
)
def step_impl(context, title, description, date, state, priority, assignee, color, manager_id):
    """Define what the task is."""
    context.task_data = {
        "title": title,
        "description": description,
        "date": date,
        "state": state,
        "priority": priority == "true",
        "assignee": assignee,
        "color": color,
        "manager_id": manager_id
    }
    response = requests.post(f"{API_URL}/createTask", json=context.task_data)
    context.response = response
    context.task = response.json()


@then("the task should be created successfully")
def step_impl(context):
    """Validate that the task was created successfully."""
    assert context.response.status_code == 200
    assert "task_id" in context.task


@then('the task title should be "{title}"')
def step_impl(context, title):
    """Validate that the task has the correct title."""
    assert context.task["title"] == title


@then("the priority should be {value}")
def step_impl(context, value):
    """Validate that the task has the correct priority."""
    expected = value.lower() == "true"
    assert context.task["priority"] == expected
