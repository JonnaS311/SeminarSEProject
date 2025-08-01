from locust import HttpUser, task, between


class MyUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def locust_server(self):
        self.client.get("/getAllTask")

    @task
    def create_task(self):
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
