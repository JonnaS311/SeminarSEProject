"""Data access object for Tasks."""
from db_connection import DatabaseConnection
from task import Task


class TaskDAO:
    """Class DAO for tasks."""
    columns = ["task_id", "title", "description", "date",
               "state", "priority", "assignee", "color", "manager_id"]

    def __init__(self):
        self.db = DatabaseConnection()
        self.db.connect()

    def create(self, task: Task) -> Task:
        """Insert a task using query."""
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
        """Select all task using query."""
        self.db.cursor.execute("SELECT * FROM Task")
        rows = self.db.cursor.fetchall()
        return [Task(**dict(zip(self.columns, row))) for row in rows]

    def find_by_id(self, task_id):
        """Select one task using query."""
        self.db.cursor.execute(
            "SELECT * FROM Task WHERE Task_ID = %s", (task_id,))
        row = self.db.cursor.fetchone()

        # convertir la tupla en un dict
        if row is not None:
            data = dict(zip(self.columns, row))
        else:
            data = None
        return Task(**data) if data else None

    def update(self, task: Task):
        """Update parcial or completely one task using a query."""
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
        """Delete one task using a query."""
        self.db.cursor.execute(
            "DELETE FROM Task WHERE Task_ID = %s", (task_id,))
        self.db.connection.commit()

    def close(self):
        """Close connection."""
        self.db.close()
