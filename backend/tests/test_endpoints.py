"""Integration Testing for API."""
# third-party
from datetime import date
from fastapi.testclient import TestClient

# local imports
from src.main import app

client = TestClient(app)
task_context = {"id": None}  # Variable mutable compartida entre funciones

# Datos de prueba
test_task = {
    "title": "Tarea de prueba",
    "description": "Creada desde test",
    "date": str(date.today()),
    "state": "todo",
    "priority": True,
    "assignee": "Tester",
    "color": "#ff0000",
    "manager_id": 1
}


def test_create_task():
    """Create a task and wait a 200 status code."""
    response = client.post("/createTask", json=test_task)
    assert response.status_code == 200
    data = response.json()
    assert "task_id" in data
    task_context["id"] = data["task_id"]  # Almacena el ID para otras pruebas


def test_get_all_tasks():
    """Get all tasks and wait a 200 status code."""
    response = client.get("/getAllTask")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_task_by_id():
    """Get one task and wait a 200 status."""
    task_id = task_context["id"]
    response = client.get(f"/getTask/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["task_id"] == task_id
    assert data["title"] == test_task["title"]


def test_update_priority():
    """Change priority and wait a 200 status code."""
    updated = test_task.copy()
    updated["task_id"] = task_context["id"]
    updated["priority"] = False
    response = client.put("/changePriorityTask", json=updated)
    assert response.status_code in (200, 204)


def test_update_state():
    """Change one task and wait a 200 status code."""
    updated = test_task.copy()
    updated["task_id"] = task_context["id"]
    updated["state"] = "done"
    response = client.put("/changeStateTask", json=updated)
    assert response.status_code in (200, 204)


def test_delete_task():
    """Delete one task and wait a 200 status code."""
    task_id = task_context["id"]
    response = client.delete(f"/deleteTask/{task_id}")
    assert response.status_code in (200, 204)


def test_get_deleted_task():
    """Get a deleted task and verify if it's None."""
    task_id = task_context["id"]
    response = client.get(f"/getTask/{task_id}")
    assert response.status_code == 200
    assert response.json() is None or response.json() == {}
