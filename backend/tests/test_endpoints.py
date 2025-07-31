from fastapi.testclient import TestClient
from src.main import app
from datetime import date

client = TestClient(app)

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
    response = client.post("/createTask", json=test_task)
    assert response.status_code == 200
    data = response.json()
    assert "task_id" in data
    global created_task_id
    created_task_id = data["task_id"]  # Para usar en otras pruebas


def test_get_all_tasks():
    response = client.get("/getAllTask")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_task_by_id():
    response = client.get(f"/getTask/{created_task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["task_id"] == created_task_id
    assert data["title"] == test_task["title"]


def test_update_priority():
    updated = test_task.copy()
    updated["task_id"] = created_task_id
    updated["priority"] = False
    response = client.put("/changePriorityTask", json=updated)
    assert response.status_code == 200 or response.status_code == 204


def test_update_state():
    updated = test_task.copy()
    updated["task_id"] = created_task_id
    updated["state"] = "done"
    response = client.put("/changeStateTask", json=updated)
    assert response.status_code == 200 or response.status_code == 204


def test_delete_task():
    response = client.delete(f"/deleteTask/{created_task_id}")
    assert response.status_code == 200 or response.status_code == 204


def test_get_deleted_task():
    response = client.get(f"/getTask/{created_task_id}")
    assert response.status_code == 200
    assert response.json() is None or response.json() == {}
