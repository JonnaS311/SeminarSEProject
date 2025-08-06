"""Acceptance test for delete a task."""
import requests
from behave import given, when, then

API_URL = "http://127.0.0.1:8000"


def create_sample_task(title):
    """Create a sample to test the task."""
    return requests.post(f"{API_URL}/createTask", json={
        "title": title,
        "description": "Temporary",
        "date": "2025-08-06",
        "state": "todo",
        "priority": False,
        "assignee": "Test",
        "color": "#123456",
        "manager_id": 1
    }).json()


@given('there is a task with title "{title}"')
def step_impl(context, title):
    """Verify the title task."""
    task = create_sample_task(title)
    context.task_id = task["task_id"]


@when("I delete the task")
def step_impl(context):
    """Make the delete action."""
    response = requests.delete(f"{API_URL}/deleteTask/{context.task_id}")
    context.delete_response = response


@then("the task should no longer be available in the system")
def step_impl(context):
    """Verify if the task don´t exist."""
    response = requests.get(f"{API_URL}/getTask/{context.task_id}")
    assert response.status_code == 404 or response.json() is None
