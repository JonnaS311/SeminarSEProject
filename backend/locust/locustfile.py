"""Locust test suite for backend performance and stress testing."""
from locust import HttpUser, task, between


class MyUser(HttpUser):
    """Simulated user behavior for perfomance testing."""
    wait_time = between(1, 5)

    @task
    def locust_server(self):
        """Testing the endpoint getAllTask."""
        self.client.get("/getAllTask")

    @task
    def create_task(self):
        """Testing the endpoint createTask using a basic task case."""
        payload = {
            "title": "Ejemplo",
            "description": "Prueba de carga",
            "date": "2025-08-01",
            "state": "todo",
            "priority": False,
            "assignee": "usuario",
            "color": "#000000",
            "manager_id": 1
        }
        self.client.post("/createTask", json=payload)

    @task
    def modify_state(self):
        """Testing the endpoint getAllTask."""
        self.client.put("/changeStateTask/todo/1")
