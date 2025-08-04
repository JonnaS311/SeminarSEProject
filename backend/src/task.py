"""Model for Tasks, important to validate the format."""
from typing import Optional
from datetime import date
from pydantic import BaseModel


class Task(BaseModel):
    """Class for Tasks representation."""
    task_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    date: date
    state: str
    priority: bool
    assignee: str
    color: str
    manager_id: int
