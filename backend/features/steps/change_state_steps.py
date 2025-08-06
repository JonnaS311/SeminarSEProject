"""Acceptance test for change state on tasks."""
import requests
from behave import given, when, then

API_URL = "http://127.0.0.1:8000"


def create_sample_task(title, state):
    """Create a sample to test"""
    return requests.post(f"{API_URL}/createTask", json={
        "title": title,
        "description": "",
        "date": "2025-06-04",
        "state": state,
        "priority": True,
        "assignee": "Anybody",
        "color": "#444444",
        "manager_id": 1
    }).json()


@given('there is a task with title "{title}" in state "{state}"')
def step_impl(context, title, state):
    """Search the title and state."""
    task = create_sample_task(title, state)
    context.task_id = task["task_id"]


@when('I change the state of the task to "{new_state}"')
def step_impl(context, new_state):
    """Change the state to other new state."""
    response = requests.put(
        f"{API_URL}/changeStateTask/{new_state}/{context.task_id}")
    context.new_state = new_state
    assert response.status_code in (200, 204)


@then('the new state of the task should be "{expected_state}"')
def step_impl(context, expected_state):
    """Compare if both state are equals (expected vs actual)."""
    task = requests.get(f"{API_URL}/getTask/{context.task_id}").json()
    assert task["state"] == expected_state
