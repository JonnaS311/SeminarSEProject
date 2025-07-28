from db_connection import DatabaseConnection
from task import Task


class TaskDAO:
    columns = ["task_id", "title", "description", "date",
               "state", "priority", "assignee", "color", "manager_id"]

    def __init__(self):
        self.db = DatabaseConnection()
        self.db.connect()

    def create(self, task: Task) -> Task:
        query = """
        INSERT INTO Task (Title, Description, Date, State, Priority, Assignee, Color, Manager_ID)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING task_id
        """
        values = (
            task.title, task.description, task.date,
            task.state, task.priority, task.assignee, task.color, task.manager_id
        )
        self.db.cursor.execute(query, values)
        task.task_id = self.db.cursor.fetchone()[0]
        self.db.connection.commit()
        return task

    def read_all(self):
        self.db.cursor.execute("SELECT * FROM Task")
        rows = self.db.cursor.fetchall()
        return [Task(**dict(zip(self.columns, row))) for row in rows]

    def find_by_id(self, task_id):
        self.db.cursor.execute(
            "SELECT * FROM Task WHERE Task_ID = %s", (task_id,))
        row = self.db.cursor.fetchone()

        # convertir la tupla en un dict
        data = dict(zip(self.columns, row))
        return Task(**data) if data else None

    def update(self, task: Task):
        query = """
        UPDATE Task SET
            Title = %s,
            Description = %s,
            Date = %s,
            State = %s,
            Priority = %s,
            Assignee = %s,
            Color = %s,
            Manager_ID = %s
        WHERE Task_ID = %s
        """
        values = (
            task.title, task.description, task.date, task.state,
            task.priority, task.assignee, task.color, task.manager_id, task.task_id
        )
        self.db.cursor.execute(query, values)
        self.db.connection.commit()

    def delete(self, task_id: int):
        print(task_id)
        self.db.cursor.execute(
            "DELETE FROM Task WHERE Task_ID = %s", (task_id,))
        self.db.connection.commit()

    def close(self):
        self.db.close()
